namespace TaskManagement.Models.Auth.In
{
    public class RegisterModel : LoginModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RepeatPassword { get; set; }
    }
}
