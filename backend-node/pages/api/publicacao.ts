import nc from 'next-connect';

import { connectMongoDB } from '../../middleware/connectDB';
import { validarTokenJWT } from '../../middleware/validateToken';
import { NextApiRequest, NextApiResponse } from 'next'
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { uploadImagemCosmic, upload } from '../../services/uploadImagemCosmic';
import { PublicacaoModel } from '../../models/PublicacaoModel'
import { UsuarioModel } from '../../models/UsuarioModel'
import { politicaCORS } from '../../middleware/politicaCORS';


const handler = nc()
    .use(upload.single('file'))
    .post(async (req: any, res: NextApiResponse<RespostaPadraoMsg>) => {
        try {
            const { userId } = req.query;
            const usuario = await UsuarioModel.findById(userId);
            if (!usuario) {
                return res.status(400).json({ error: 'Usuário não encontrado.' });
            }

            if (!req || !req.body) {
                return res.status(400).json({ error: 'Parâmetros de entrada não informados.' });
            }
            const { descricao, file } = req?.body;

            if (!descricao || descricao.length < 2) {
                return res.status(400).json({ error: 'Descrição não é válida.' });
            }
            if (!req.file || !req.file.originalname) {
                return res.status(400).json({ error: 'Imagem é obrigatória.' });
            }

            const image = await uploadImagemCosmic(req);
            const publicacao = {
                idUsuario: usuario._id,
                descricao,
                foto: image.media.url,
                data: new Date()
            }

            await PublicacaoModel.create(publicacao);
            usuario.publicacoes++
            await UsuarioModel.findByIdAndUpdate({ _id: usuario._id }, usuario)

            return res.status(200).json({ msg: 'Publicação criada com sucesso' });
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: `Erro na requisição ${error}` });
        }
    });

export const config = {
    api: {
        bodyParser: false
    }
}

export default politicaCORS(validarTokenJWT(connectMongoDB(handler)));