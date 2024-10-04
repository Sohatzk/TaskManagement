using Microsoft.EntityFrameworkCore;
using TaskManagement.Service.Users;
using TaskManagement.Storage;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "AngularClient",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200");
        });
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TaskManagementContext> (option =>
    option.UseNpgsql(builder.Configuration.GetConnectionString("TaskManagementConnectionString")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AngularClient");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
