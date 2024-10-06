namespace TaskManagement.Models.Auth.Out
{
    public class UserClaim
    {
        public string Type { get; set; }
        public string Value { get; set; }
        public UserClaim(string type, string value)
        {
            Type = type;
            Value = value;
        }
    }
}
