import { useState, useEffect } from "react";
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";


const feedService = new FeedService();

const Feed = ({ usuarioLogado, idUsuario }: any) => {
  const [listaDePostagens, setListaDePostagens] = useState<any>([]);
  const getFeed = async (idUsuario:any) =>{
    let data;
    let retrievedData;
    if(!idUsuario){
      data = await feedService.carregarPostagem()
      retrievedData = data.data.result;
    }else{
      data = await feedService.carregarPostagem(idUsuario);
      retrievedData = data.data;
    }
    //console.log(retrievedData)
    let postagensFormatadas = retrievedData.map((postagem: any) => ({
      id: postagem._id,
      usuario: {
        id: postagem.idUsuario,
        nome: postagem?.usuario?.nome || postagem?.usuarioNome,
        avatar: postagem?.usuario?.avatar || postagem?.avatar,
      },
      fotoDoPost: postagem.foto,
      descricao: postagem.descricao,
      curtidas: postagem.likes,
      comentarios: postagem.comentarios.map((c: any) => ({
        nome: c.nome,
        mensagem: c.comentario,
      })),
    }));
    setListaDePostagens(postagensFormatadas);

  }

  useEffect(() => {
    getFeed(idUsuario);
  }, [usuarioLogado, idUsuario]);


  return (
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map((dadosPostagem: any, index: number) => (
        <Postagem {...dadosPostagem} key={index} usuarioLogado={usuarioLogado} />
      ))}
    </div>
  );
};

export default Feed;
