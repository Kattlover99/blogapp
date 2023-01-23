import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middleware/connectDB';
import { politicaCORS } from '../../middleware/politicaCORS';
import { validarTokenJWT } from '../../middleware/validateToken'
import { PublicacaoModel } from '../../models/PublicacaoModel';
import { SeguidorModel } from '../../models/SeguidorModel';
import { UsuarioModel } from '../../models/UsuarioModel';
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg';

const feedEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {
    try {
        if (req.method === "GET") {
            // receber uma informacao do id do usuario
            const { id } = req.query;
            if (req?.query?.id) {
                const usuario = await UsuarioModel.findById(id);
                if (!usuario) {
                    return res.status(400).json({ error: 'Usuario não é valido' });
                }
                let publicacoes = await PublicacaoModel.find({ idUsuario: usuario._id })
                    .sort({ data: -1 });


                const resposta = publicacoes.map(p=>(
                    {
                        _id: p?._id,
                        idUsuario: p?.idUsuario,
                        descricao: p?.descricao,
                        foto: p?.foto,
                        comentarios: p?.comentarios,
                        likes: p?.likes,
                        avatar: usuario?.avatar,
                        usuarioNome: usuario?.nome
                    }
                ))

                return res.status(200).json(resposta);
                // buscar do feed
                // onde vme informacao
            } else {
                //feed principal
                const { userId } = req.query;
                const usuarioLogado = await UsuarioModel.findById(userId)
                if (!usuarioLogado) {
                    return res.status(403).json({ error: 'Usuário não encontrado.' })
                }

                const seguidores = await SeguidorModel.find({ usuarioLogadoId: userId })
                const seguidoresIds = seguidores.map(s => s.usuarioSeguidoId)

                const publicacoes = await PublicacaoModel.find({
                    $or: [
                        { idUsuario: usuarioLogado._id },
                        { idUsuario: seguidoresIds }
                    ]

                })
                    .sort({ data: -1 });

                const result = [];

                for (const publicacao of publicacoes) {
                    const usuarioDaPublicacao = await UsuarioModel.findById(publicacao.idUsuario)
                    const final = {
                        ...publicacao._doc, usuario: {
                            nome: usuarioDaPublicacao.nome,
                            avatar: usuarioDaPublicacao.avatar
                        }
                    }

                    result.push(final);
                }

                return res.status(200).json({ result });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'não foi possivel obter o feed' })
    }
}

export default politicaCORS(validarTokenJWT(connectMongoDB(feedEndpoint)));