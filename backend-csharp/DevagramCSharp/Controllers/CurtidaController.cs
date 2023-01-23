using DevagramCSharp.Dtos;
using DevagramCSharp.Models;
using DevagramCSharp.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DevagramCSharp.Controllers
{

    [ApiController]
    [Route("api/[Controller]")]
    public class CurtidaController : BaseController
    {
        private ILogger<CurtidaController> _logger;
        private readonly ICurtidaRepository _curtidaRepository;
        public CurtidaController(
            IUsuarioRepository usuarioRepository,
            ILogger<CurtidaController> logger,
            ICurtidaRepository curtidaRepository
            ) : base(usuarioRepository)
        {
            _logger = logger;
            _curtidaRepository = curtidaRepository;
        }

        [HttpPut]
        public IActionResult Curtir([FromBody] CurtidaRequisicaoDto curtidadto)
        {
            try
            {
                if (curtidadto != null)
                {
                    Curtida curtida = _curtidaRepository.GetCurtida(curtidadto.IdPublicacao, LerToken().Id);

                    if (curtida != null)
                    {
                        _curtidaRepository.Descurtir(curtida);
                        return Ok("Descurtido com sucesso!");
                    }
                    else
                    {
                        Curtida curtidanova = new Curtida()
                        {
                            IdPublicacao = curtidadto.IdPublicacao,
                            IdUsuario = LerToken().Id
                        };

                        _curtidaRepository.Curtir(curtidanova);
                        return Ok("Curtida realizada com sucesso!");
                    }

                }
                else
                {
                    _logger.LogError("A requisição de curtir está vazia");
                    return BadRequest("A requisição de curtir está vazia");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocorreu um erro ao Curtir/Descurtir" + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorRespostaDto()
                {
                    Descricao = "Ocorreu um erro ao Curtir/Descurtir.",
                    Status = StatusCodes.Status500InternalServerError
                });
            }

        }

    }
}
