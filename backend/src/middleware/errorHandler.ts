import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    
    if (err.name === 'MongooseServerSelectionError') {
        return res.status(500).json({
            message: 'Database connection error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }
    
    res.status(500).json({ message: 'Internal server error' });
};
