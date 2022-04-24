using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;

namespace dotnet_ng.Connection;

public class ConnectionClass
{
    public MySqlConnection connection;

    public ConnectionClass()
    {
        string host = "localhost";
        string database = "test_cs";
        string username = "root";
        string password = "root123@";
        string port = "3306";
        string connection_string = $"Server={host};database={database};port={port};username={username};Pwd={password};SslMode=none;";

        connection = new MySqlConnection(connection_string);
    }


}


