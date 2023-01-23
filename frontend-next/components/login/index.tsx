import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { validarEmail, validarSenha } from "../../utils/validadores";

import InputPublico from "../inputPublico";
import { envelope, key, logo } from "../../public/image";
import Button from "../button";
import { toast } from "react-toastify";
import ApiUsuarioService from "../../services/ApiUsuarioService";

const usuarioService = new ApiUsuarioService();

const Login = ({aposAutenticacao}:any) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [estaSubmentendo, setEstaSubmentendo] = useState(false);

  const validarFormulario = () => {
    return validarEmail(email) && validarSenha;
  };

  const handleSubmit = async (e: Event | any) => {
    setEstaSubmentendo(true);
    e.preventDefault();
    try {
      const usuarioLoginObject = {
        login: email,
        senha
      }
      await usuarioService.login(usuarioLoginObject);

      if(aposAutenticacao){
        aposAutenticacao();
      }

      toast.success('Logado com sucesso', { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      toast("Erro ao Logar usuario", {
        type: "warning",
        autoClose: 3000,
      });
    }
    setEstaSubmentendo(false);
  };
  return (
    <section className={`paginaLogin paginaPublica`}>
      <div className="logoContainer">
        <Image src={logo} alt="Instagram Logo" fill className="logo" />
      </div>

      <div className={`conteudoPaginaPublica`}>
        <form onSubmit={handleSubmit}>
          <InputPublico
            image={envelope}
            tipo="email"
            texto="Email"
            aoAlterarValor={(e: any) => setEmail(e.target.value)}
            valor={email}
            mensagemValidacao="O endereço informado é inválido."
            exibirMensagemValidacao={email && !validarEmail(email)}
          />

          <InputPublico
            image={key}
            tipo="password"
            texto="Senha"
            aoAlterarValor={(e: any) => setSenha(e.target.value)}
            valor={senha}
            mensagemValidacao="A senha informada é inválida."
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />

          <Button
            type="submit"
            text="Login"
            isDisabled={!validarFormulario() && estaSubmentendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Não possui cadastro?</p>
          <Link href="/cadastro">Faça seu cadastro agora</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
