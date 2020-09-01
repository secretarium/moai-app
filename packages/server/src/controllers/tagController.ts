import ErrorHelper from '../utils/errorHelper';
import message from '../utils/messages';
import { Request, Response } from 'express';

class TagController {

    static async createTag({ body: { data } }: Request, res: Response): Promise<boolean> {

        if (data === undefined) {
            res.status(401).json(ErrorHelper(message.userError.MISSINGARGUMENT));
            return;
        }
        try {
            res.status(200).json({
                status: 'success'
            });
        } catch (error) {
            res.status(400).json(ErrorHelper(message.errorMessages.UPDATEFAIL, error));
            return false;
        }
    }
}

export default TagController;