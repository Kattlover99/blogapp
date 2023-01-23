using DevagramCSharp.Models;

namespace DevagramCSharp.Repository.Impl
{
    public class CurtidasRepositoryImpl : ICurtidaRepository
    {
        private readonly DevagramContext _context;


        public CurtidasRepositoryImpl(DevagramContext context)
        {
            _context = context;
        }

        public void Curtir(Curtida curtida)
        {
            _context.Add(curtida);
            _context.SaveChanges();

        }

        public void Descurtir(Curtida curtida)
        {
            _context.Remove(curtida);
            _context.SaveChanges();
        }

        public Curtida GetCurtida(int idPublicacao, int idUsuario)
        {
            return _context.Curtidas.FirstOrDefault(c => c.IdPublicacao == idPublicacao &&
            c.IdUsuario == idUsuario);
        }

        public List<Curtida> GetCurtidaPorPublicacao(int idPublicacao)
        {
            return _context.Curtidas.Where(c => c.IdPublicacao == idPublicacao).ToList();
        }
    }
}
