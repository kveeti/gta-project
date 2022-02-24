using Backend.Api.Configs;
using Backend.Api.Data;
using Backend.Api.Repositories;
using Microsoft.EntityFrameworkCore;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories.ModelCar;
using Backend.Api.Repositories.ModelGarage;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IDataContext, DataContext>();
builder.Services.AddScoped<IGenericRepo<User>, GenericRepo<User>>();
builder.Services.AddScoped<IGenericRepo<ModelCar>, GenericRepo<ModelCar>>();
builder.Services.AddScoped<IGenericRepo<ModelGarage>, GenericRepo<ModelGarage>>();
builder.Services.AddScoped<IGenericRepo<Garage>, GenericRepo<Garage>>();
builder.Services.AddScoped<IGenericRepo<Car>, GenericRepo<Car>>();

builder.Services.AddScoped<ICarRepo, CarRepo>();
builder.Services.AddScoped<IGarageRepo, GarageRepo>();
builder.Services.AddScoped<IModelCarRepo, ModelCarRepo>();
builder.Services.AddScoped<IModelGarageRepo, ModelGarageRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();

builder.Services.AddSingleton<IJwt, Jwt>();
builder.Services.AddSingleton<IMailing, Mailing>();
builder.Services.AddSingleton<IMisc, Misc>();

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JWT_Config"));
builder.Services.Configure<EmailConfig>(builder.Configuration.GetSection("EmailConfig"));

var app = builder.Build();

app.MapControllers();
app.UseRouting();

app.Run("http://0.0.0.0:5000");