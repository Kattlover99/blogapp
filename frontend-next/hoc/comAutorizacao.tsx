import { useRouter } from "next/router";
import Header from "../components/layout/Header";
import ApiUsuarioService from "../services/ApiUsuarioService";
import { search } from "../public/image";
import Footer from "../components/layout/Footer";
import Loading from "../components/loading";
import Head from "next/head";

const usuarioService = new ApiUsuarioService();

export default function comAutorizacao(Componente: any) {
  return function Amigo(props: any) {
    const router = useRouter();

    if (typeof window !== "undefined") {
      if (!usuarioService.estaAuthenticado()) {
        router.replace("/");
        return null;
      }

      const usuarioLogado = usuarioService.obterInformacoesDoUsuarioLogado();

      return (
        <>
          <Head>
            <title>Devagram</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="description"
              content="Blog inspirado onde é possível postar, editar e adicionar postagens com imagem."
            ></meta>
          </Head>
          <Header usuarioLogado={usuarioLogado} />
          <Loading />
          <Componente usuarioLogado={usuarioLogado} {...props} />
          <Footer usuarioLogado={usuarioLogado} />
        </>
      );
    }

    return null;
  };
}
