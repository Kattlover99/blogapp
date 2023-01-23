using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevagramCSharp.Models
{
    public class Publicacao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Foto { get; set; }
        public int IdUsuario { get; set; }


        [ForeignKey("IdUsuario")]
        public virtual Usuario Usuario { get; set; }
    }
}
