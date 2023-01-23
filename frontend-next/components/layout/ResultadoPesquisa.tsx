import React from "react";
import Avatar from "../avatar";

const ResultadoPesquisa = ({ nome, avatar, email, onClick, id }: any) => {
    return (
    <div className="resultadoPesquisa" onClick={()=> onClick(id)}>
      <Avatar src={avatar} />
      <div className="informacoesUsuario">
        <strong>{nome}</strong>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default ResultadoPesquisa;
