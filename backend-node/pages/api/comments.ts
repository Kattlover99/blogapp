import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '../../middleware/connectDB';
import { politicaCORS } from '../../middleware/politicaCORS';
import { validarTokenJWT } from '../../middleware/validateToken';
import { PublicacaoModel } from '../../models/PublicacaoModel';
import { UsuarioModel } from '../../models/UsuarioModel';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg';

const commentEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'PUT') {
            const { id, userId } = req.query;
            const usuarioLogado = await UsuarioModel.findById(userId);
            if (!usuarioLogado) {
                return res.status(400).json({ error: 'Usuario não encontrado' })
            }

            const publicacao = await PublicacaoModel.findById(id)
            if (!publicacao) {
                return res.status(400).json({ error: 'Publicação não encontrada' })
            }

            if (!req.body || !req.body.comentario || req.body.comentario.length < 2) {
                return res.status(400).json({ error: 'Comentário não é valido' })
            }

            const comentario = {
                usuarioId: usuarioLogado._id,
                nome: usuarioLogado.nome,
                comentario: req.body.comentario
            }
            publicacao.comentarios.push(comentario);
            await PublicacaoModel.findByIdAndUpdate({ _id: publicacao._id }, publicacao)
            return res.status(200).json({ msg: `Comentário adiciona com sucesso por ${usuarioLogado.nome}` })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Ocorreu um erro ao adicionar um comentário." })
    }


}


export default politicaCORS(validarTokenJWT(connectMongoDB(commentEndpoint)));