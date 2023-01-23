import {
  homeGray,
  homePurple,
  userGray,
  userBlue,
  plusSquareGray,
  plusSquareFilled,
} from "../../public/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const mapaDeRotas = {
  home: {
    imagemAtivo: homePurple,
    rotasAtivacao: ["/"],
    imagemPadrao: homeGray,
  },
  publicacao: {
    imagemAtivo: plusSquareFilled,
    rotasAtivacao: ["/publicacao"],
    imagemPadrao: plusSquareGray,
  },
  perfil: {
    imagemAtivo: userBlue,
    rotasAtivacao: ["/perfil/eu", "/perfil/editar"],
    imagemPadrao: userGray,
  },
};

const Navbar = ({ className }: any) => {
  const [rotaAtiva, setRotaAtiva] = useState("home");
  const router = useRouter();

  useEffect(() => {
    definirRotaAtiva();
  }, [router.asPath]);

  const definirRotaAtiva = () => {
    const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
    const indiceAtivo = chavesDoMapaDeRotas.findIndex((chave: any) => {
      //@ts-ignore
      return mapaDeRotas[chave].rotasAtivacao.includes(
        window.location.pathname
      );
    });
    if (indiceAtivo === -1) {
      setRotaAtiva("home");
    } else {
      setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
    }
  };

  const obterImagem = (nome: any) => {
    //@ts-ignore
    const rotaAtivada = mapaDeRotas[nome];

    if (rotaAtiva === nome) {
      return rotaAtivada.imagemAtivo;
    }
    return rotaAtivada.imagemPadrao;
  };

  const aoClicarnoIcone = (nomeRota: any) => {
    setRotaAtiva(nomeRota);
    //@ts-ignore
    router.push(mapaDeRotas[nomeRota].rotasAtivacao[0]);
  };

  return (
    <nav className={`barraNavegacao ${className}`}>
      <ul>
        <li onClick={() => aoClicarnoIcone("home")}>
          <Image src={obterImagem("home")} alt="home" width={20} height={20} />
        </li>

        <li onClick={() => aoClicarnoIcone("publicacao")}>
          <Image
            src={obterImagem("publicacao")}
            alt="seguir"
            width={20}
            height={20}
          />
        </li>
        <li onClick={() => aoClicarnoIcone("perfil")}>
          <Image
            src={obterImagem("perfil")}
            alt="usuario"
            width={20}
            height={20}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
