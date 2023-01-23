import { useState } from "react";
import Avatar from "../avatar";

const FazerComentario = ({ usuarioLogado, comentar }: any) => {
  const [linhas, setLinhas] = useState(1);
  const [comentario, setComentario] = useState("");
  const [trimmedComment, setTrimmedComment] = useState("");

  const AoDigitarComentario = (e: any) => {
    const valorInput = e.target.value;
    setComentario(valorInput);
    setTrimmedComment(e.target.value.trim());
    setLinhas(valorInput.length > 0 ? 2 : 1);
  };

  const aoPressionarQualquerTecla = (e: any) => {
    if (e.key === "Enter") {
      fazerComentario();
    }
  };

  const fazerComentario = async () => {
    if (trimmedComment.trim().length === 0 || !comentar) return;
    const sucessoAoComentar = await comentar(comentario);

    if (sucessoAoComentar) {
      setComentario("");
      setLinhas(0);
    }
  };

  return (
    <div className="containerFazerComentario">
      <Avatar src={usuarioLogado.avatar} />
      <textarea
        rows={linhas}
        placeholder="Adicione um comentário..."
        onChange={AoDigitarComentario}
        onKeyDown={aoPressionarQualquerTecla}
        value={comentario}
      ></textarea>
      <button
        onClick={fazerComentario}
        type="button"
        className="btnPublicacao desktop"
      >
        Publicar
      </button>
    </div>
  );
};

export default FazerComentario;
