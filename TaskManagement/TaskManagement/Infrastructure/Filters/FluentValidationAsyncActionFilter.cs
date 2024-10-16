using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Reflection;

namespace TaskManagement.Infrastructure.Filters
{
    public class FluentValidationAsyncActionFilter : IAsyncActionFilter
    {
        private readonly Type[] _modelTypes;
        private readonly IServiceProvider _serviceProvider;
        public FluentValidationAsyncActionFilter(IServiceProvider serviceProvider)
        {
            _modelTypes = GetInputTypes();
            _serviceProvider = serviceProvider;
        }
        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var model = context.ActionArguments.Values.SingleOrDefault(v => _modelTypes.Contains(v.GetType()));
            if (model is null)
            {
                await next();
                return;
            }

            var validatorType = typeof(IValidator<>).MakeGenericType(model.GetType());

            if (_serviceProvider.GetService(validatorType) is not IValidator modelValidator)
            {
                await next();
                return;
            }

            var validationContext = new ValidationContext<object>(model);

            var validationResult = await modelValidator.ValidateAsync(validationContext);

            if (!validationResult.IsValid)
            {
                context.Result = new BadRequestObjectResult(validationResult.Errors);
                return;
            }

            await next();
        }

        private Type[] GetInputTypes()
        {
            var assembly = Assembly.GetExecutingAssembly();

            var assemblyName = assembly.GetName().Name;

            return assembly.GetTypes()
                .Where(t => t.Namespace != null &&
                    t.Namespace.Contains(".In") &&
                    t.Namespace.StartsWith($"{assemblyName}.Models"))
                .ToArray();
        }
    }
}
