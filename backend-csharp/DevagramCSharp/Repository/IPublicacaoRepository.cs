using DevagramCSharp.Dtos;
using DevagramCSharp.Models;

namespace DevagramCSharp.Repository
{
    public interface IPublicacaoRepository
    {
        public void Publicar(Publicacao publicacao);

        List<PublicacaoFeedRespostaDto> GetPublicacaoesFeed(int idUsuario);

        List<PublicacaoFeedRespostaDto> GetPublicacaoesFeedUsuario(int idUsuario);

        int GetQtdePublicacoes(int idUsuario);
    }
}
