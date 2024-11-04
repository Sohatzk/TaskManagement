using FluentValidation;
using TaskManagement.Models.Auth.In;
using TaskManagement.Shared;

namespace TaskManagement.Validators
{
    public class LoginModelValidator : AbstractValidator<LoginModel>
    {
        public LoginModelValidator()
        {
            RuleFor(m => m.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(m => m.Password)
                .NotEmpty()
                .MinimumLength(TaskManagementConstants.User.MinPasswordLength);
        }
    }
}
