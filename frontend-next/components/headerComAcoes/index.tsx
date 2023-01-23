import Image from "next/image";

const HeaderComAcoes = ({
  className,
  iconeEsquerda,
  textoEsquerda,
  aoClicarAcaoEsquerda,
  titulo,
  elementoDireita,
  logoutHandle,
  aoClicarElementoDireita,
}: any) => {
  return (
    <div className={`cabecalhoComAcoes ${className}`}>
      {iconeEsquerda ? (
        <div className="setaEsquerda" onClick={aoClicarAcaoEsquerda}>
          <Image
            src={iconeEsquerda}
            alt="icone esquerda cabecalho ações"
            width={25}
            height={25}
          />
        </div>
      ) : (
        textoEsquerda !== null && (
          <div
            onClick={aoClicarAcaoEsquerda}
            className="cabecalhoComAcoesTextoEsquerda"
          >
            {textoEsquerda}
          </div>
        )
      )}
      <h3>{titulo}</h3>
      {elementoDireita && (
        <button
          type="button"
          className="btnAcaoDireita"
          onClick={logoutHandle ? logoutHandle : aoClicarElementoDireita}
        >
          {elementoDireita}
        </button>
      )}
    </div>
  );
};

export default HeaderComAcoes;
