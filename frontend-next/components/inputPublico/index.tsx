import Image from "next/image";

const InputPublico = ({
  image,
  tipo,
  texto,
  valor = "",
  exibirMensagemValidacao = false,
  mensagemValidacao,
  aoAlterarValor,
}: any) => {
  return (
    <div className="inputPublicoContainer">
      <div className="inputPublico">
        <Image src={image} alt="Imagem do campo" width={20} height={20} />
        <input
          type={tipo}
          placeholder={texto}
          value={valor}
          onChange={aoAlterarValor}
        />
      </div>
      {exibirMensagemValidacao && (
        <p className="mensagemValidacao">{mensagemValidacao}</p>
      )}
    </div>
  );
};

export default InputPublico;
