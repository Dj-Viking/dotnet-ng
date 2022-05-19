namespace dotnet_ng;

public class HashResult
{
    public string? hashed { get; set; }
    public string? salt { get; set; }

    public HashResult(string _hashed, string _salt)
    {
        hashed = _hashed;
        salt = _salt;
    }
}