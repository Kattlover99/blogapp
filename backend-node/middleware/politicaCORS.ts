import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import Cors from 'cors'
import Express from 'express';
const app = Express();
app.use(Cors());


// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD','OPTIONS'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}



export const politicaCORS = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await runMiddleware(req, res, cors)
            return handler(req, res);
        } catch (e) {
            console.log('Erro ao tratar a politica de CORS:', e);
            return res.status(500).json({ erro: 'Ocorreu erro ao tratar a politica de CORS' });
        }
    }