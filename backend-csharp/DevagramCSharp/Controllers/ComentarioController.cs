using DevagramCSharp.Dtos;
using DevagramCSharp.Models;
using DevagramCSharp.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DevagramCSharp.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ComentarioController : BaseController
    {
        private readonly ILogger<ComentarioController> _logger;
        private readonly IComentarioRepository _comentarioRepository;

        public ComentarioController(
            ILogger<ComentarioController> logger,
            IComentarioRepository comentarioRepository,
            IUsuarioRepository usuarioRepository) : base(usuarioRepository)
        {
            _logger = logger;
            _comentarioRepository = comentarioRepository;
        }


        [HttpPut]
        public IActionResult Comentar([FromBody] ComentarioRequisicaoDto comentariodto)
        {
            try
            {
                if (comentariodto != null)
                {
                    if (String.IsNullOrEmpty(comentariodto.Descricao) || String.IsNullOrWhiteSpace(comentariodto.Descricao))
                    {
                        _logger.LogError("O Comentario recebido estava vazio.");
                        return BadRequest("Por favor coloque seu comentário.");
                    }
                    Comentario comentario = new Comentario();

                    comentario.Descricao = comentariodto.Descricao;
                    comentario.IdPublicacao = comentariodto.IdPublicacao;
                    comentario.IdUsuario = LerToken().Id;

                    _comentarioRepository.Comentar(comentario);
                }
                return Ok("Comentario salvo com sucesso!");
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocorreu um erro ao Comentar: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorRespostaDto()
                {
                    Descricao = "Ocorreu um erro ao Comentar.",
                    Status = StatusCodes.Status500InternalServerError
                });
            }
        }
    }
}
