import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '../../middleware/connectDB';
import { politicaCORS } from '../../middleware/politicaCORS';
import { validarTokenJWT } from '../../middleware/validateToken';
import { PublicacaoModel } from '../../models/PublicacaoModel';
import { UsuarioModel } from '../../models/UsuarioModel';
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg';
import usuario from './usuario';

const likeEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'PUT') {
            const { id } = req.query;
            const publicacao = await PublicacaoModel.findById(id);
            if (!publicacao) {
                res.status(400).json({ error: "Publicação não encontrada." })
            }

            const { userId } = req?.query;
            const usuario = await UsuarioModel.findById(userId);
            if (!usuario) {
                return res.status(400).json({ error: "Usuário não encontrado" })
            }

            //index -1, user didn't like the photo, if > -1 user liked the photo
            const userIndexOnLike: number = publicacao.likes.findIndex((e: any) => e.toString() === usuario._id.toString());


            if (userIndexOnLike !== -1) {
                publicacao.likes.splice(userIndexOnLike, 1);
                await PublicacaoModel.findByIdAndUpdate({ _id: publicacao._id }, publicacao)
                return res.status(200).json({ msg: 'Post Descurtido' })
            } else {
                 publicacao.likes.push(usuario._id);
                 await PublicacaoModel.findByIdAndUpdate({ _id: publicacao._id }, publicacao); 
                return res.status(200).json({ msg: 'Postagem Curtida.' })
            }
        }
        return res.status(403).json({ msg: 'Wrong method' });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error on the like/dislike function" })
    }

}

export default politicaCORS(validarTokenJWT(connectMongoDB(likeEndpoint)));