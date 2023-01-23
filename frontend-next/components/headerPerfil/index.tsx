import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import HeaderComAcoes from "../headerComAcoes";
import { leftArrow, logout } from "../../public/image";
import Avatar from "../avatar";
import Button from "../button";
import ApiUsuarioService from "../../services/ApiUsuarioService";

const usuarioService = new ApiUsuarioService();

const HeaderPerfil = ({ usuarioLogado, usuario, estaNoPerfilPessoal }: any) => {
  const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(
    usuario.segueEsseUsuario
  );
  const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);

  const router = useRouter();
  useEffect(() => {
    if (!usuario) return;
    setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
    setQuantidadeSeguidores(usuario.seguidores);
  }, [usuario]);

  const obterTextoBotaoSeguir = () => {
    if (estaNoPerfilPessoal) {
      return "Editar perfil";
    }
    if (estaSeguindoOUsuario) {
      return "Deixar de seguir";
    }
    return "Seguir";
  };

  const obterCorDoBotaoSeguir = () => {
    if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
      return "outline";
    }
    return "primary";
  };

  const manipularCliqueBotaoSeguir = async () => {
    if (estaNoPerfilPessoal) {
      return router.push("/perfil/editar");
    }

    try {
      await usuarioService.alterarSeguir(usuario._id);
      setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
      setQuantidadeSeguidores(
        estaSeguindoOUsuario
          ? quantidadeSeguidores - 1
          : quantidadeSeguidores + 1
      );
    } catch (error) {
      console.log(error);
      toast.error("Erro ao seguir usuário", { autoClose: 2000 });
    }
  };

  const aoClicarSetaEsquerda = () => {
    router.back();
  };

  const logoutHandle = () => {
    usuarioService.logout();
    router.replace("/");
  };

  const obterElementoDireitaCabecalho = () => {
    if (estaNoPerfilPessoal) {
      return (
        <Image
          src={logout}
          alt="Botao deslogar"
          onClick={logoutHandle}
          width={25}
          height={25}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="cabecalhoPerfil largura30pctDesktop">
        <HeaderComAcoes
          iconeEsquerda={estaNoPerfilPessoal ? null : leftArrow}
          titulo={usuario.nome}
          aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
          elementoDireita={obterElementoDireitaCabecalho()}
          logoutHandle={logoutHandle}
        />

        <hr className="linhaDivisoria"/>

        <div className="statusPerfil">
          <Avatar src={usuario.avatar} />
          <div className="informacoesPerfil">
            <div className="statusContainer">
              <div className="status">
                <strong>{usuario.publicacoes}</strong>
                <span>Publicações</span>
              </div>

              <div className="status">
                <strong>{quantidadeSeguidores}</strong>
                <span>Seguidores</span>
              </div>

              <div className="status">
                <strong>{usuario.seguindo}</strong>
                <span>Seguindo</span>
              </div>
            </div>
            <Button
              type="button"
              text={obterTextoBotaoSeguir()}
              color={obterCorDoBotaoSeguir()}
              onClick={manipularCliqueBotaoSeguir}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPerfil;
