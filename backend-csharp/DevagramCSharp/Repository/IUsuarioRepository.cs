using DevagramCSharp.Models;

namespace DevagramCSharp.Repository
{
    public interface IUsuarioRepository
    {
        public bool VerificarEmail(string email);
        public void Salvar(Usuario usuario);
        public Usuario GetUsuarioLoginSenha(string email, string senha);
        public Usuario GetUsuarioPorId(int id);
        public void AtualizarUsuario(Usuario usuario);
        public List<Usuario> GetUsuarioNome(string nome);
    }
}
