import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/button";
import HeaderComAcoes from "../../components/headerComAcoes";
import UploadImagem from "../../components/uploadImage";
import comAutorizacao from "../../hoc/comAutorizacao";
import { avatar, leftArrow } from "../../public/image";
import FeedService from "../../services/FeedService";

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao() {
  const [imagem, setImagem] = useState();
  const [descricao, setDescricao] = useState("");
  const [inputImagem, setInputImagem] = useState<any | null>();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const router = useRouter();

  const estaNaEtapaUm = () => etapaAtual === 1;

  const obterTextoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm() && imagem) {
      return "Cancelar";
    }

    return "";
  };

  const obterTextoDireitaCabecalho = () => {
    if (!imagem) {
      return "";
    }

    if (estaNaEtapaUm()) {
      return "Avançar";
    }

    return "Compartilhar";
  };

  const aoClicarAcaoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm()) {
      inputImagem.value = null;
      //@ts-ignore
      setImagem(null);
      return;
    }

    setEtapaAtual(1);
  };

  const aoClicarAcaoDireitaCabecalho = () => {
    if (estaNaEtapaUm()) {
      setEtapaAtual(2);
      return;
    }

    publicar();
  };

  const escreverDescricao = (e: any) => {
    const valorAtual = e.target.value;
    if (valorAtual.length >= limiteDaDescricao) {
      return;
    }

    setDescricao(valorAtual);
  };

  const obterClassNameCabecalho = () => {
    if (estaNaEtapaUm()) {
      return "primeiraEtapa";
    }

    return "segundaEtapa";
  };

  const publicar = async () => {
    try {
      if (!validarFormulario()) {
        toast.error(
          "A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada."
        );
        return;
      }

      const corpoPublicacao = new FormData();
      corpoPublicacao.append("descricao", descricao);
      //@ts-ignore
      corpoPublicacao.append("file", imagem?.arquivo);

      await feedService.fazerPublicacao(corpoPublicacao);
      toast.success("Postagem publicada com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao salvar publicação!");
    }
  };

  const validarFormulario = () => {
    //@ts-ignore
    return descricao.length >= descricaoMinima && imagem?.arquivo;
  };

  return (
    <div className="paginaPublicacao largura30pctDesktop">
      <HeaderComAcoes
        className={obterClassNameCabecalho()}
        iconeEquerda={estaNaEtapaUm() ? null : leftArrow}
        textoEsquerda={obterTextoEsquerdaCabecalho()}
        aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
        elementoDireita={obterTextoDireitaCabecalho()}
        aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
        titulo="Nova publicação"
      />

      <hr className="linhaDivisoria" />

      <div className="conteudoPaginaPublicacao">
        {estaNaEtapaUm() ? (
          <div className="primeiraEtapa">
            <UploadImagem
              setImagem={setImagem}
              aoSetarAReferencia={setInputImagem}
              imagemPreviewClassName={
                !imagem ? "previewImagemPublicacao" : "previewImagemSelecionada"
              }
              //@ts-ignore
              imagemPreview={imagem?.preview || avatar.src}
            />

            <span className="desktop textoDragAndDrop">
              Arraste sua foto aqui!
            </span>

            <Button
              type="button"
              text="Selecionar uma imagem"
              onClick={() => inputImagem?.click()}
            />
          </div>
        ) : (
          <>
            <div className="segundaEtapa">
              <UploadImagem
                setImagem={setImagem}
                //@ts-ignore
                imagemPreview={imagem?.preview}
              />

              <textarea
                rows={3}
                value={descricao}
                placeholder="Escreva uma legenda..."
                onChange={escreverDescricao}
              ></textarea>
            </div>
            <hr className="linhaDivisoria" />
          </>
        )}
      </div>
    </div>
  );
}

export default comAutorizacao(Publicacao);
