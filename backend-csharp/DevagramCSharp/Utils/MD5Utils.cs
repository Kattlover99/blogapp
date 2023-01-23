using System.Security.Cryptography;
using System.Text;

namespace DevagramCSharp.Utils
{
    public class MD5Utils
    {
        public static string gerarHashMD5(string texto)
        {
            MD5 md5hash = MD5.Create();
            var bytes = md5hash.ComputeHash(Encoding.UTF8.GetBytes(texto));

            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < bytes.Length; i++)
            {
                stringBuilder.Append(bytes[i]);
            }

            return stringBuilder.ToString();

        }
    }
}
