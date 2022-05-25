using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;

namespace dotnet_ng.Connection;

public class ConnectionClass
{
    private readonly IConfiguration config;
    public MySqlConnection connection;
    public string connection_string;
    public ConnectionClass(IConfiguration config)
    {
        this.config = config;
        this.connection_string = this.config["ConnectionStrings:dev"];

        this.connection = new MySqlConnection(connection_string);
    }


}


