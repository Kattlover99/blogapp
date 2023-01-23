import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Feed from "../../components/feed";
import HeaderPerfil from "../../components/headerPerfil";
import comAutorizacao from "../../hoc/comAutorizacao";
import ApiUsuarioService from "../../services/ApiUsuarioService";

const usuarioService = new ApiUsuarioService();

const Perfil = ({ usuarioLogado }: any) => {
  const [usuario, setUsuario] = useState({});
  const [estaNoPerfilPessoal, setEstaNoPerfilPessoal] = useState(false)
  const router = useRouter();

  const obterPerfil = async (idUsuario: any) => {
    let result;
    try {
      if (idUsuario === "eu"|| router.query.id===usuarioLogado.id ) {
        console.log("é igual a eu");
        setEstaNoPerfilPessoal(true)
        const { data } = await usuarioService.obterPerfil(usuarioLogado.id);
        result = data;
      }
      if (idUsuario !== "eu") {
        console.log("2");
        const { data } = await usuarioService.obterPerfil(idUsuario);
        result = data;
      }

      return result;
    } catch (error) {
      console.log(error);
      toast.error("Error ao obter perfil do usuário.", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    if (!router.query.id) return;
    obterPerfil(router.query.id).then((result: any) => setUsuario(result));
  }, []);

  return (
    <>
      {console.log(usuarioLogado)}
      <div className="paginaPerfil">
        <HeaderPerfil
          usuarioLogado={usuarioLogado}
          usuario={usuario}
          estaNoPerfilPessoal={estaNoPerfilPessoal}
        />
        <Feed
          usuarioLogado={usuarioLogado}
          idUsuario={
            router.query.id === "eu" ? usuarioLogado.id : router.query.id
          }
        />
      </div>
    </>
  );
};

export default comAutorizacao(Perfil);
