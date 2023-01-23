using System.Net.Http.Headers;
using DevagramCSharp.Dtos;

namespace DevagramCSharp.Services
{
    public class CosmicService
    {
        public string EnviarImagem(ImagemDto imagemDto)
        {

            Stream imagem;

            imagem = imagemDto.Imagem.OpenReadStream();

            var client = new HttpClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "PSr8Oyu4uLFX8HVB8iY433nGgucjrVxWeRlKKx3AKN9ubwGywE");

            var request = new HttpRequestMessage(HttpMethod.Post, "file");
            var conteudo = new MultipartFormDataContent
            {
                { new StreamContent(imagem),"media",imagemDto.Nome }
            };

            request.Content = conteudo;
            var retornoreq = client.PostAsync("https://upload.cosmicjs.com/v2/buckets/instagram-devagrambucket/media", request.Content).Result;


            var urlretorno = retornoreq.Content.ReadFromJsonAsync<CosmicRespostaDto>();

            return urlretorno.Result.media.Url;
        }
    }
}
