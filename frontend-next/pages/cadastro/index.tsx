import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import InputPublico from "../../components/inputPublico";
import { avatar, envelope, key, logo, userBlue } from "../../public/image";
import Button from "../../components/button";
import UploadImage from "../../components/uploadImage";
import {
  validarConfirmacaoSenha,
  validarEmail,
  validarNome,
  validarSenha,
} from "../../utils/validadores";
import ApiUsuarioService from "../../services/ApiUsuarioService"
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const usuarioService = new ApiUsuarioService();

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirma, setSenhaConfirma] = useState("");
  const [imagem, setImagem] = useState(null);
  const [estaSubmentendo, setEstaSubmentendo] = useState(false);
  const router = useRouter();

  const validarFormulario = () => {
    return (
      validarNome(nome) &&
      validarEmail(email) &&
      validarSenha(senha) &&
      validarConfirmacaoSenha(senha, senhaConfirma)
    );
  };

  const onSubmit = async (e: Event | any) => {
    setEstaSubmentendo(true);
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const corpoRequisicaoCadastro = new FormData();
      corpoRequisicaoCadastro.append("nome", nome);
      corpoRequisicaoCadastro.append("email", email);
      corpoRequisicaoCadastro.append("senha", senha);
      //@ts-ignore
      if (imagem?.arquivo) {
        //@ts-ignore
        corpoRequisicaoCadastro.append("file", imagem?.arquivo);
      }

      const request = await usuarioService.cadastro(corpoRequisicaoCadastro);
      toast(request.data.msg, { autoClose: 3000, type: "success" });
      await usuarioService.login({
        login: email,
        senha
      })

      router.push('/');
    } catch (error: Error | any) {
      console.log(error);
      toast(`Error ao cadastrar usuário. ${+error?.response?.data?.error}`, {
        autoClose: 5000,
        type: "warning",
      });
    }
    setEstaSubmentendo(false);
  };

  return (
    <section className={`paginaCadastro paginaPublica`}>
      <div className="logoContainer desktop">
        <Image src={logo} alt="Instagram Logo" layout="fill" className="logo" />
      </div>

      <div className={`conteudoPaginaPublica`}>
        <form onSubmit={onSubmit}>
          <UploadImage
            imagemPreviewClassName="avatar avatarPreview"
            //@ts-ignore
            imagemPreview={imagem?.preview || avatar.src}
            setImagem={setImagem}
          />

          <InputPublico
            image={userBlue}
            tipo="text"
            texto="Nome"
            aoAlterarValor={(e: any) => setNome(e.target.value)}
            valor={nome}
            mensagemValidacao="O nome digitado não é válido."
            exibirMensagemValidacao={nome && !validarNome(nome)}
          />
          <InputPublico
            image={envelope}
            tipo="email"
            texto="Email"
            aoAlterarValor={(e: any) => setEmail(e.target.value)}
            valor={email}
            mensagemValidacao="O email digitado não é válido."
            exibirMensagemValidacao={email && !validarEmail(email)}
          />

          <InputPublico
            image={key}
            tipo="password"
            texto="Senha"
            aoAlterarValor={(e: any) => setSenha(e.target.value)}
            valor={senha}
            mensagemValidacao="A senha digitada não é válida."
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />
          <InputPublico
            image={key}
            tipo="password"
            texto="Confirme sua senha"
            aoAlterarValor={(e: any) => setSenhaConfirma(e.target.value)}
            valor={senhaConfirma}
            mensagemValidacao="A confirmação não é igual a senha digitada não é válida."
            exibirMensagemValidacao={
              senhaConfirma && !validarConfirmacaoSenha(senha, senhaConfirma)
            }
          />

          <Button
            type="submit"
            text="Cadastrar"
            isDisabled={!validarFormulario() || estaSubmentendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Já possui uma conta?</p>
          <Link href="/"> Faça seu login agora!</Link>
        </div>
      </div>
    </section>
  );
};

export default Cadastro;
