using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_ng;

public class User
{
    public string? username { get; set; }
    public string? user_pass { get; set; }
    public string? email { get; set; }
    public string? user_role { get; set; }
    public string? salt { get; set; }
}