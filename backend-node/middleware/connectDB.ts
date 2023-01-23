import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from 'mongoose'
import type { RespostaPadraoMsg } from '../types/RespostaPadraMsg';

export const connectMongoDB = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
        // Check if database is connected
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        // not connected then start connection
        const { MONGO_DB_URL } = process.env;

        // if env is empty, abort the system
        if (!MONGO_DB_URL) {
            return res.status(500).json({ error: 'ENV de configuração do banco não informada.' })
        }
        mongoose.connection.on('error', error => console.log(`Ocorreu um erro ao conectar no banco: ${error} `))
        mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
        await mongoose.connect(MONGO_DB_URL);


        return handler(req, res);
    }