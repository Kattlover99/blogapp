const validarNome = (nome:string) =>{
    return nome?.toString().length>2;
}

const validarEmail = (email:string)=>{
    const emailStr = email?.toString();
    return emailStr.length>=5 && emailStr.includes('@')&&emailStr.includes('.');
}

const validarSenha = (senha:String)=>{
    return senha?.toString().length>3;
}

const validarConfirmacaoSenha = (senha:string,confirmacao:string)=>{
    return validarSenha(senha) && senha === confirmacao;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha
}