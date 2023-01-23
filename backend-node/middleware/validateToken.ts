import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../types/RespostaPadraMsg';



export const validarTokenJWT = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    try {
        const { JWT_KEY } = process.env;
        if (!JWT_KEY) {
            return res.status(200).json({ msg: "ENV JWT Não informado no middleware." })
        }
        if (!req.method || !req.headers) {
            return res.status(401).json({ error: 'Não foi possivel validar o token de acesso.' })
        }


        if (req.method !== 'OPTIONS') {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                return res.status(401).json({ error: 'Não foi possivel validar o token de acesso.' })
            }

            const token = authorization.substring(7);
            if (!token) {
                return res.status(401).json({ error: 'Não foi possivel validar o token de acesso.' })
            }

            const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;
            if (!decoded) {
                return res.status(401).json({ error: 'Não foi possivel validar o token de acesso.' })
            }
            if (!req.query) {
                req.query = {};
            }
            req.query.userId = decoded._id;
        }

    } catch (err: any) {
        console.log(err);
        return res.status(401).json({ error: 'Não foi possivel validar o token de acesso.' })
    }



    return handler(req, res);
}