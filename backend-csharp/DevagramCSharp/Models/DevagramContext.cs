using Microsoft.EntityFrameworkCore;

namespace DevagramCSharp.Models
{
    public class DevagramContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public DevagramContext(DbContextOptions<DevagramContext> options, IConfiguration configuration) : base(options)
        {
            Configuration = configuration;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            string host = Environment.GetEnvironmentVariable("DB_HOST");
            string username = Environment.GetEnvironmentVariable("DB_USERNAME");
            string password = Environment.GetEnvironmentVariable("DB_PASSWORD");
            string database = Environment.GetEnvironmentVariable("DB_DATABASE");
            string port = Environment.GetEnvironmentVariable("DB_PORT");


            string connection = $"Host={host}; Port={port}; Username={username}; Password={password}; Database={database}";


            // optionsBuilder.UseInMemoryDatabase("TestDb");
            // var connectionString = Configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseMySql(connection, ServerVersion.AutoDetect(connection));
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Seguidor> Seguidores { get; set; }
        public DbSet<Publicacao> Publicacoes { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Curtida> Curtidas { get; set; }
    }
}
