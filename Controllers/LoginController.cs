using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Text;
using Dapper;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using dotnet_ng.Connection;

namespace dotnet_ng.Controllers;

[ApiController]
[Route("/api/login")]
public class LoginController : ControllerBase
{
    private readonly IConfiguration _config;

    public LoginController(IConfiguration config)
    {
        this._config = config;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult Login([FromBody] UserLogin userLogin)
    {

        var authResult = Authenticate(userLogin);
        if (authResult is Exception)
        {
            return BadRequest(new { error = authResult });
        }

        if (authResult is not null)
        {
            string token = this.Generate(authResult);
            return Ok(new { token = token });
        }

        return NotFound("user not found");
    }

    private static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
    {
        byte[] saltBytes = Convert.FromBase64String(storedSalt);

        Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(
            enteredPassword, saltBytes, 10000);

        return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256)) == storedHash;
    }

    private dynamic? Authenticate(UserLogin userLogin)
    {
        using (IDbConnection db = new ConnectionClass(this._config).connection)
        {
            string query = $@"
                SELECT
                    *
                FROM
                    users
                WHERE
                    users.email = '{userLogin.email}'";

            User? currentUser = db.QuerySingle<User>(query, null);

            if (currentUser is not null)
            {
                //check password hashing
                bool matched = VerifyPassword(
                    userLogin.user_pass!, currentUser.user_pass!, currentUser.salt!);

                if (matched)
                    return currentUser;
                else
                    return new Exception("Incorrect credentials");
            }
            else
                return null;
        }

    }

    private string Generate(User user)
    {
        SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(this._config["Jwt:Key"]));

        SigningCredentials credentials = new SigningCredentials(securityKey,
            SecurityAlgorithms.HmacSha256);

        Claim[] claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.username!),
            new Claim(ClaimTypes.Email, user.email!),
            new Claim(ClaimTypes.Role, user.user_role!),
        };

        JwtSecurityToken token = new JwtSecurityToken(
            this._config["Jwt:Issuer"],
            this._config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}