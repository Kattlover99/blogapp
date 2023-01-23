using DevagramCSharp.Models;

namespace DevagramCSharp.Repository
{
    public interface ISeguidorRepository
    {
        public bool Seguir(Seguidor seguidor);
        public bool Desseguir(Seguidor seguidor);
        public Seguidor GetSeguidor(int idseguidor, int idseguido);
        int GetQtdeSeguidores(int idUsuario);
        int GetQtdeSeguindo(int idUsuario);
    }
}
