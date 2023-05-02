using Car_Rental_System.Data;
using Microsoft.EntityFrameworkCore;
using System;
using Car_Rental_System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// injecting the car service for swagger 
//builder.Services.AddDbContext<CarsAPIDbContext>(options => options.UseInMemoryDatabase("CarsDb"));
builder.Services.AddDbContext<CarsAPIDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<GetUserId>();

var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Initializing the authentication
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
