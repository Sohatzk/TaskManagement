using FluentValidation;
using TaskManagement.Models.Auth.In;

namespace TaskManagement.Validators
{
    public class LoginModelValidator : AbstractValidator<LoginModel>
    {
        public LoginModelValidator()
        {
            RuleFor(m => m.Email).NotEmpty();

            RuleFor(m => m.Password).NotEmpty();
        }
    }
}
