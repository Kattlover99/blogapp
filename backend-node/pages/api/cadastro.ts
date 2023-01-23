import type { NextApiRequest, NextApiResponse } from 'next'
import { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { CadastroRequisicao } from '../../types/CadastroRequisicao'
import { connectMongoDB } from '../../middleware/connectDB'
import { UsuarioModel } from '../../models/UsuarioModel'
import bcrypt from 'bcrypt';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic';
import nc from 'next-connect';
import { politicaCORS } from '../../middleware/politicaCORS'

const handler = nc().use(upload.single('file'))
    .post(
        async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
            // typescript type, new bonus mega cool
            const usuario = req.body as CadastroRequisicao;

            if (!usuario.nome || usuario.nome.length < 2) {
                return res.status(400).json({ error: 'Nome invalido' });
            }
            if (!usuario.email
                || usuario.email.length < 5
                || !usuario.email.includes('@')
                || !usuario.email.includes('.')) {
                return res.status(405).json({ error: 'Email informado não é valido.' })
            }

            if (!usuario.senha || usuario.senha.length < 4) {
                return res.status(400).json({ error: 'Senha Inválida.' })
            }

            // validar se ja tem um usuarui
            const usuariosComMesmoEmail = await UsuarioModel.find({ email: usuario.email });
            if (usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0) {
                return res.status(200).json({ error: 'Já existe uma conta com email informado.' })
            }

            // enviar a image do multer para o cosmic
            const image = await uploadImagemCosmic(req);

            //salvar no banco de dado
            const senhaEncrypt = await bcrypt.hash(usuario.senha, 10);

            const dbSave = await UsuarioModel.create({
                nome: usuario.nome,
                email: usuario.email,
                senha: senhaEncrypt,
                avatar: image?.media?.url
            });

            return res.status(200).json({
                msg: "usuário criado com sucesso.",
                nome: dbSave.nome,
                email: dbSave.email,
                avatar: dbSave.avatar
            })
        }
    );


export const config = {
    api: {
        bodyParser: false
    }
}


export default politicaCORS(connectMongoDB(handler));