import { useRef, useEffect } from "react";
import { UploadImage } from "../../types/UploadImageType";

export default function UploadImagem({
  className,
  setImagem,
  imagemPreview,
  imagemPreviewClassName,
  aoSetarAReferencia,
}:UploadImage) {
  const referenciaInput = useRef(null);

  useEffect(() => {
    if (!aoSetarAReferencia) {
      return;
    }

    aoSetarAReferencia(referenciaInput?.current);
  }, [referenciaInput?.current]);

  const abrirSeletorArquivos = () => {
    //@ts-ignore
    referenciaInput?.current?.click();
  };

  const aoAleterarImagem = () => {
    //@ts-ignore
    if (!referenciaInput?.current?.files?.length) {
      return;
    }
    //@ts-ignore
    const arquivo = referenciaInput?.current?.files[0];
    obterUrlDaImagemEAtualizarEstado(arquivo);
  };

  const obterUrlDaImagemEAtualizarEstado = (arquivo:any) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(arquivo);
    fileReader.onloadend = () => {
      setImagem({
        preview: fileReader.result,
        arquivo,
      });
    };
  };

  const aoSoltarAImagem = (e:any) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const arquivo = e.dataTransfer.files[0];
      obterUrlDaImagemEAtualizarEstado(arquivo);
    }
  };

  return (
    <div
      className={`uploadImagemContainer ${className}`}
      onClick={abrirSeletorArquivos}
      onDragOver={(e) => e.preventDefault()}
      onDrop={aoSoltarAImagem}
    >
      {imagemPreview && (
        <div className="imagemPreviewContainer">
          <img
            src={imagemPreview}
            alt="imagem preview"
            className={imagemPreviewClassName}
          />
        </div>
      )}

      <input
        type="file"
        className="oculto"
        accept="image/*"
        ref={referenciaInput}
        onChange={aoAleterarImagem}
      />
    </div>
  );
}
