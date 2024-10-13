using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Infrastructure;
using TaskManagement.Service.Infrastructure;
using TaskManagement.Service.Users;
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
        });

builder.Services.AddAuthorization();

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TaskManagementContext> (option =>
    option.UseNpgsql(builder.Configuration.GetConnectionString("TaskManagementConnectionString")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();

var config = new MapperConfiguration(cfg => {
    cfg.AddProfile<DescriptorMapper>();
    cfg.AddProfile<ViewMapper>();
});

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(_ => { });

app.UseSpa(x => x.UseProxyToSpaDevelopmentServer("http://localhost:4200"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
