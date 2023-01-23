import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderComAcoes from "../../components/headerComAcoes";
import UploadImagem from "../../components/uploadImage";
import comAutorizacao from "../../hoc/comAutorizacao";
import { avatar as AvatarPadrao, xCircle as limpar } from "../../public/image";
import Image from "next/image";
import { toast } from "react-toastify";
import ApiUsuarioService from "../../services/ApiUsuarioService";
import { validarNome } from "../../utils/validadores";

const usuarioService = new ApiUsuarioService();

const EditarPerfil = ({ usuarioLogado }: any) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<any>();
  const [nome, setNome] = useState(usuarioLogado.nome);
  const [inputAvatar, setInputAvatar] = useState();
  const aoClicarAcaoEsquerda = () => {
    router.push("/perfil/eu");
  };

  useEffect(() => {
    setNome(usuarioLogado.nome);
    setAvatar({ preview: usuarioLogado.avatar });
  }, []);

  const atualizarPerfil = async () => {
    try {
      if (!validarNome(nome)) {
        toast.error("Nome precisa de pelo menos 2 caracteres.");
      }

      const corpoRequisicao = new FormData();
      corpoRequisicao.append("nome", nome);

      if (avatar.arquivo) {
        corpoRequisicao.append("file", avatar.arquivo);
      }

      await usuarioService.atualizarPerfil(corpoRequisicao);
      localStorage.setItem("nome", nome);
      if (avatar.arquivo) {
        localStorage.setItem("avatar", avatar.preview);
        setAvatar(avatar.preview);
      }
      toast.success("Usuario atualizado com sucesso.");
      router.push("/perfil/eu");
      setNome(nome);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar perfil.");
    }
  };

  const abrirSeletorDeArquivos = () => {
    console.log("seletor");
  };

  return (
    <div className="paginaEditarPerfil largura30pctDesktop">
      <div className="conteudoPaginaEditarPerfil">
        <HeaderComAcoes
          titulo={"Editar perfil"}
          textoEsquerda={"Cancelar"}
          elementoDireita={"Concluir"}
          aoClicarElementoDireita={atualizarPerfil}
          aoClicarAcaoEsquerda={aoClicarAcaoEsquerda}
        />
        <hr className="linhaDivisoria" />

        <div className="edicaoAvatar">
          <UploadImagem
            setImagem={setAvatar}
            //@ts-ignore -- preview exists on avatar
            imagemPreview={avatar?.preview || AvatarPadrao.src}
            aoSetarAReferencia={setInputAvatar}
            imagemPreviewClassName="avatar"
            className="avatarDiv"
          />

          <span onClick={abrirSeletorDeArquivos}>Alterar foto do perfil</span>

          <hr className="linhaDivisoria" />

          <div className="edicaoNome">
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e: any) => setNome(e.target.value)}
            />
            <Image
              src={limpar}
              alt="Excluir"
              width={14}
              height={14}
              onClick={() => setNome("")}
            />
          </div>
          <hr className="linhaDivisoria" />
        </div>
      </div>
    </div>
  );
};

export default comAutorizacao(EditarPerfil);
