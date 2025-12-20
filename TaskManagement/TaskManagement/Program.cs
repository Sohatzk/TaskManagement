using FluentValidation;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Infrastructure;
using TaskManagement.Infrastructure.Extensions;
using TaskManagement.Infrastructure.Filters;
using TaskManagement.Service.Infrastructure;
using TaskManagement.Storage;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication()
    .AddCookie(
        CookieAuthenticationDefaults.AuthenticationScheme,
        o =>
        {
            o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            o.Cookie.Name = "taskmanagementcookie";
            o.ExpireTimeSpan = TimeSpan.FromHours(1);
            o.SlidingExpiration = true;
            o.Events.OnRedirectToAccessDenied =
                o.Events.OnRedirectToLogin = c =>
                {
                    c.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.FromResult<object>(null);
                };
        });

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins(
                "http://localhost:8080/",
                "https://taskmanagement-app-g4b7gtaxgdcyhmce.centralus-01.azurewebsites.net")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

builder.Services.AddAuthorization();

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add<FluentValidationAsyncActionFilter>();
});

builder.Services.AddDbContext<TaskManagementContext>(option =>
    option.UseNpgsql(builder.Configuration.GetConnectionString("TaskManagementConnectionString")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddServices();
builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program));
builder.Services.AddAutoMapper(
    [
        typeof(EntityMapper),
        typeof(DescriptorMapper),
        typeof(ViewMapper),
        typeof(ResponseMapper)
    ]);

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseUserInformationMiddleware();

app.UseEndpoints(_ => { });

app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSpa(x => x.UseProxyToSpaDevelopmentServer("http://localhost:4200"));
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseSpa(spa =>
    {
        spa.Options.SourcePath = "ClientApp/TaskManagementClient";
    });
}

if (app.Configuration["EF_MIGRATE"]?.ToLower() == "true")
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<TaskManagementContext>(); 
    db.Database.Migrate();
}

app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/healthz", () => "Ok");

app.Run();
