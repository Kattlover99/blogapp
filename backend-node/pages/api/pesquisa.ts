import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middleware/connectDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraMsg'
import { validarTokenJWT } from '../../middleware/validateToken';
import { UsuarioModel } from '../../models/UsuarioModel'
import { politicaCORS } from '../../middleware/politicaCORS';
import { SeguidorModel } from '../../models/SeguidorModel';

const pesquisaEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | Array<String>>) => {
    try {
        if (req.method == "OPTIONS") {
            res.setHeader("Allow", "POST,PUT,PATCH,DELETE,OPTIONS,HEAD");
            return res.status(202).json({});
        }
        if (req.method === 'GET') {
            if (req?.query?.id) {
                const usuarioEncontrado = await UsuarioModel.findById(req?.query?.id)
                if (!usuarioEncontrado) {
                    return res.status(400).json({ error: 'Usuario não encontrado.' })
                }

                const user = {
                    senha: null,
                    segueEsseUsuario: false,
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    _id: usuarioEncontrado._id,
                    avatar: usuarioEncontrado.avatar,
                    seguidores: usuarioEncontrado.seguidores,
                    seguindo: usuarioEncontrado.seguindo,
                    publicacoes: usuarioEncontrado.publicacoes,
                } as any

                const segueEsseUsuario = await SeguidorModel.find(
                    {
                        usuarioId: req?.query?.userId,
                        usuarioSeguindoId: usuarioEncontrado._id
                    })
                if (segueEsseUsuario && segueEsseUsuario.length > 0) {
                    user.segueEsseUsuario = true;
                }
                return res.status(200).json(user);
                //return res.status(200).json(usuarioEncontrado);
            } else {
                const { filtro } = req.query;

                if (!filtro || filtro.length < 2) {
                    return res.status(400).json({ error: 'Favor informar pelo menos mais que dois caracteres.' })
                }

                const usuariosEncontrados = await UsuarioModel.find({
                    //ve por nome ou email
                    $or: [
                        { nome: { $regex: filtro, $options: 'i' } },
                        // { email: { $regex: filtro, $options: 'i' } },
                    ]
                })

                usuariosEncontrados.forEach(userFound => {
                    userFound.senha = null
                })
                return res.status(200).json(usuariosEncontrados)
            }

        }
        return res.status(405).json({ error: 'Metodo informado não é válido' })
    } catch (error) {
        console.log(error);
        return res.status(200).json({ msg: 'A pesquisa não pode ser concluída.' })
    }
}

export default politicaCORS(validarTokenJWT(connectMongoDB(pesquisaEndpoint)));