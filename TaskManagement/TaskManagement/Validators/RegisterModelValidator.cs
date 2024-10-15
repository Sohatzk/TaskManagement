using FluentValidation;
using TaskManagement.Models.Auth.In;

namespace TaskManagement.Validators
{
    public class RegisterModelValidator : AbstractValidator<RegisterModel>
    {
        public RegisterModelValidator()
        {
            Include(new LoginModelValidator());

            RuleFor(m => m.FirstName).NotEmpty();

            RuleFor(m => m.LastName).NotEmpty();

            RuleFor(m => m.RepeatPassword)
                .NotEmpty()
                .Equal(m => m.Password);
        }
    }
}
