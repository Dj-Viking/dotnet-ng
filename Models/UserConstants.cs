using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_ng;

public class UserConstants
{
    public static List<User> users = new List<User>()
    {
        new User()
        {
            username = "bobbyjoe",
            email = "bobbyjoe@mail.com",
            user_pass = "bobbyjoe",
            user_role = "admin"
        },
        new User()
        {
            username = "billybob",
            email = "billybob@mail.com",
            user_pass = "billybob",
            user_role = "user"
        },
    };

}