import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middleware/connectDB';
import { validarTokenJWT } from '../../middleware/validateToken'
import { UsuarioModel } from '../../models/UsuarioModel';
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg';
import nextConnect from 'next-connect';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic';
import { politicaCORS } from '../../middleware/politicaCORS';

const handler = nextConnect()
    .use(upload.single('file'))
    .put(async (req: any, res: NextApiResponse<RespostaPadraoMsg | any>) => {
        try {
            const { userId } = req?.query;
            const usuario = await UsuarioModel.findById(userId);
            if (!usuario) {
                return res.status(400).json({ error: "Usuario não encontrado." })
            }

            const { nome } = req.body;
            if (nome || nome.length > 2) {
                usuario.nome = nome;
            }
            const { file } = req;
            if (file && file.originalname) {
                const image = await uploadImagemCosmic(req);
                if (image && image.media && image.media.url) {
                    usuario.avatar = file;
                }
            }

            await UsuarioModel.findByIdAndUpdate({ _id: usuario._id }, usuario)

            return res.status(200).json({ msg: "Usuario alterado com sucesso." })
        } catch (error) {
            console.log(error)
        }
        res.status(400).json({ error: 'Não foi possivel atualizar o usuario.' })
    })
    .get(async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {
        // id do usuario

        try {
            const { userId } = req.query;
            const usuario = await UsuarioModel.findById(userId);
            usuario.senha = null;
            return res.status(200).json(usuario)
        } catch (error) {
            console.log(error);
        }
        return res.status(400).json({ error: 'Não foi possivel obter dados do usuario' })
    }
    );

export const config = {
    api: {
        bodyParser: false
    }
}

export default politicaCORS(validarTokenJWT(connectMongoDB(handler)));