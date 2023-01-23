namespace DevagramCSharp.Dtos
{
    public class ErrorRespostaDto
    {
        public int Status { get; set; }
        public string Descricao { get; set; }
        public List<string> Erros { get; internal set; }
    }
}
