import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    userId?: string;
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        console.log("first one logging")
        try {
            const decoded = jwt.verify(token, 'secret-key');
            console.log(decoded,"decoded")
            req.userId = (decoded as { userId: string }).userId;
            next();
            console.log("for last one alos ")
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

    } catch (error) {
        console.log(error);
    }
};
