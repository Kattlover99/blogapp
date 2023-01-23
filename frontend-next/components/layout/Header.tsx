import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { logoHorizontal, search } from "../../public/image";
import ApiUsuarioService from "../../services/ApiUsuarioService";
import Navbar from "./Navbar";
import ResultadoPesquisa from "./ResultadoPesquisa";

const usuarioService = new ApiUsuarioService();

const Header = ({ usuarioLogado }: any) => {
  const [resultadoPesquisa, setResultadoPesquisa] = useState<any>([]);
  const [termoPesquisado, setTermoPesquisado] = useState<any>("");

  const router = useRouter();

  let cabecalhoClassName = "";
  if (window && window.location.pathname !== "/") {
    cabecalhoClassName = 'desktop'
  }

  const aoPesquisar = async (e: any) => {
    setTermoPesquisado(e.target.value);
    setResultadoPesquisa([]);

    if (e.target.value.length < 3) return;

    try {
      const { data } = await usuarioService.pesquisa(termoPesquisado);
      setResultadoPesquisa(data);
    } catch (error) {
      toast.error("Erro ao pesquisar.");
    }
  };

  const aoClicarResultadoPesquisa = (id: string) => {
    setTermoPesquisado("");
    setResultadoPesquisa([]);

    router.push(`/perfil/${id}`);
  };

  const redirecionarParaHome = () => {
    router.push("/");
  };

  return (
    <div className={`homeHeader ${cabecalhoClassName}`}>
      <div className="conteudoCabecalhoPrincipal">
        <div className="logoHeaderPrincipal" onClick={redirecionarParaHome}>
          <Image src={logoHorizontal} alt="Logo Principal" fill />
        </div>

        <div className="barraPesquisa">
          <div className="containerImagemLupa">
            <Image src={search} alt="Icone Lupa" fill />
          </div>
          <input
            type="text"
            value={termoPesquisado}
            placeholder="Pesquisar"
            onChange={aoPesquisar}
          />
        </div>
        <Navbar className="desktop" />
      </div>
      {resultadoPesquisa.length > 0 && (
        <div className="resultadoPesquisaContainer">
          {resultadoPesquisa.map((r: any, index: number) => (
            <ResultadoPesquisa
              avatar={r.avatar}
              nome={r.nome}
              email={r.email}
              key={index}
              id={r._id}
              onClick={aoClicarResultadoPesquisa}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
