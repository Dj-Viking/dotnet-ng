using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;

namespace dotnet_ng.Connection;

public class ConnectionClass
{
    private string host;
    private string database;
    private string username;
    private string password;
    public MySqlConnection connection;
    public string connection_string;

    public ConnectionClass()
    {
        host = "localhost";
        database = "test_cs";
        username = "root";
        password = "root123@";
        connection_string = $"Server={host};Database={database};User={username};Password={password};";

        connection = new MySqlConnection(connection_string);
    }


}


