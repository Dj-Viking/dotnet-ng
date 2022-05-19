using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Dapper;
using dotnet_ng.Connection;
using dotnet_ng;

namespace dotnet_ng.Controllers;

[ApiController]
[Route("/api/signup")]
public class SignupController : ControllerBase
{
    private IConfiguration _config;

    public SignupController(IConfiguration config)
    {
        _config = config;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult Signup([FromBody] UserSignup userSignup)
    {
        try
        {
            // get user from db if exists...prevent another sign up of same person
            using (IDbConnection db = new ConnectionClass().connection)
            {

                string query = $@"
                    SELECT
                        *
                    FROM
                        users
                    WHERE
                        users.email = '{userSignup.email}';";

                IEnumerable<User>? users = db.Query<User>(query, null);

                if (users.Count() == 0)
                {
                    // hash the password
                    HashResult hashResult = HashPassword(userSignup.user_pass!);

                    //create the new user from class and insert into database
                    string insert = $@"
                        INSERT INTO
                            users (username, email, user_pass, user_role, salt)
                        VALUES (
                            '{userSignup.username}',
                            '{userSignup.email}', 
                            '{hashResult.hashed}', 
                            'user',
                            '{hashResult.salt}');";

                    string inserted = "SELECT LAST_INSERT_ID();";

                    int rowsAffected = db.Execute(insert, null);

                    //maybe this doesn't matter...but just in case there is a race condition if we are querying before the rows are affected not too sure
                    Thread.Sleep(10);
                    int id = db.QuerySingle<int>(inserted, null);

                    return Ok(new { status = 200, id = id });
                }
                else
                {
                    return BadRequest(new { error = "user already exists" });
                }

            }
        }
        catch (Exception e)
        {
            return BadRequest(new { error = e });
        }
    }

    private static HashResult HashPassword(string input_pass)
    {
        // hash the password
        // generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
        byte[] saltBytes = new byte[16];

        RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();

        provider.GetNonZeroBytes(saltBytes);

        string salt = Convert.ToBase64String(saltBytes);

        Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(
            input_pass, saltBytes, 10000);
        string hashed = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

        return new HashResult(hashed, salt);
    }
}