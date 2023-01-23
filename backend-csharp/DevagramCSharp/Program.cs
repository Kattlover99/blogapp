using System.Text;
using DevagramCSharp;
using DevagramCSharp.Models;
using DevagramCSharp.Repository;
using DevagramCSharp.Repository.Impl;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);



        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<DevagramContext>();

        Console.WriteLine("HOST Connection String: " + Environment.GetEnvironmentVariable("DB_HOST") +
        Environment.GetEnvironmentVariable("DB_USERNAME") +
        Environment.GetEnvironmentVariable("DB_PASSWORD") +
        Environment.GetEnvironmentVariable("DB_DATABASE") +
        Environment.GetEnvironmentVariable("DB_PORT"));



        builder.Services.AddScoped<IUsuarioRepository, UsuarioRepositoryImpl>();
        builder.Services.AddScoped<ISeguidorRepository, SeguidorRepositoryImpl>();
        builder.Services.AddScoped<IPublicacaoRepository, PublicacaoRepositoryImpl>();
        builder.Services.AddScoped<IComentarioRepository, ComentarioRepositoryImpl>();
        builder.Services.AddScoped<ICurtidaRepository, CurtidasRepositoryImpl>();

        var chaveCriptogragia = Encoding.ASCII.GetBytes(ChaveJWT.ChaveSecreta);
        builder.Services.AddAuthentication(auth =>
        {
            auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

        }).AddJwtBearer(autenticacao =>
        {
            autenticacao.RequireHttpsMetadata = false;
            autenticacao.SaveToken = true;
            autenticacao.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(chaveCriptogragia),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        //if (app.Environment.IsDevelopment())
        //{
        app.UseSwagger();
        app.UseSwaggerUI();
        //}

        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}