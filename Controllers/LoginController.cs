using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace dotnet_ng.Controllers;

[ApiController]
[Route("/api/login")]
public class LoginController : ControllerBase
{
    private IConfiguration _config;

    public LoginController(IConfiguration config)
    {
        _config = config;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult Login([FromBody] UserLogin userLogin)
    {
        User? user = Authenticate(userLogin);

        if (user is not null)
        {
            string token = Generate(user);
            return Ok(new { token = token });
        }

        return NotFound("user not found");
    }

    private User? Authenticate(UserLogin userLogin)
    {
        User? currentUser = UserConstants.users.FirstOrDefault(o =>
            o?.username?.ToLower() == userLogin?.username?.ToLower()
            && o?.password == userLogin?.password);

        if (currentUser is not null)
            return currentUser;
        else
            return null;
    }

    private string Generate(User user)
    {
        SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("Dhft0S5uphK3vmCJQrexSt1RsyjZBjXWRgJMFPU4"));

        SigningCredentials credentials = new SigningCredentials(securityKey,
            SecurityAlgorithms.HmacSha256);

        Claim[] claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.username!),
            new Claim(ClaimTypes.Email, user.email!),
            new Claim(ClaimTypes.Role, user.role!),
        };

        JwtSecurityToken token = new JwtSecurityToken(
            "https://localhost:44305/",
            "https://localhost:44305/",
            claims: claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}