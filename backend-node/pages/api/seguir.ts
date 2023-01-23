import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "../../middleware/connectDB";
import { politicaCORS } from "../../middleware/politicaCORS";
import { validarTokenJWT } from "../../middleware/validateToken";
import { SeguidorModel } from "../../models/SeguidorModel";
import { UsuarioModel } from "../../models/UsuarioModel";
import { RespostaPadraoMsg } from "../../types/RespostaPadraMsg";


const endpointSeguir = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'PUT') {
            //user logged in/authenticated
            const { userId, id } = req.query;
            if (req.query?.id === userId) {
                return res.status(400).json({ msg: 'Cannot follow yourself' })
            }

            const loggedUser = await UsuarioModel.findById(userId);
            if (!loggedUser) {
                return res.status(400).json({ error: 'Logged user not found.' })
            }

            const userToBeFollowed = await UsuarioModel.findById(id);
            if (!userToBeFollowed) {
                return res.status(400).json({ error: 'User to be followed no found.' })
            }
            const FollowThisUserQuestion = await SeguidorModel.find({ usuarioId: loggedUser._id, usuarioSeguidoId: userToBeFollowed._id })
            if (FollowThisUserQuestion && FollowThisUserQuestion.length > 0) {


                FollowThisUserQuestion.forEach(async (e: any) => await SeguidorModel.findByIdAndDelete({ _id: e._id }));

                loggedUser.seguindo--;
                await UsuarioModel.findByIdAndUpdate({ _id: userId }, loggedUser);


                userToBeFollowed.seguidores--;
                await UsuarioModel.findByIdAndUpdate({ _id: id }, userToBeFollowed);

                return res.status(200).json({ msg: `Unfollowed ${userToBeFollowed.nome} ` })

            } else {
                await SeguidorModel.create({
                    usuarioId: userId,
                    usuarioSeguidoId: id
                })

                loggedUser.seguindo++;
                await UsuarioModel.findByIdAndUpdate({ _id: userId }, loggedUser);


                userToBeFollowed.seguidores++;
                await UsuarioModel.findByIdAndUpdate({ _id: id }, userToBeFollowed);
                return res.status(200).json({ msg: `Followed ${userToBeFollowed.nome} ` })

            }



        }
        return res.status(405).json({ msg: "Method do not exists." })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Wasn't possible to follow/unfollow." })
    }
}

export default politicaCORS(validarTokenJWT(connectMongoDB(endpointSeguir)));