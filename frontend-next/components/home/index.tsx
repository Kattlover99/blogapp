import comAutorizacao from "../../hoc/comAutorizacao";
import Feed from "../feed";

export const Home = ({usuarioLogado}:any) => {
  return (
    <Feed usuarioLogado={usuarioLogado} />
  )
}

export default comAutorizacao(Home);