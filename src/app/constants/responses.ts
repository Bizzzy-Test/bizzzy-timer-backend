import { Response } from 'express';
import messageConstants from "./messages";

interface ResponseData {
    success: (res: Response, body: any, msg: string) => boolean;
    fail: (res: Response, msg: string, status?: number) => boolean;
    unauthorized: Record<string, any>;
    tokenRequired: Record<string, any>;
}

const responseData: ResponseData = {
    success: function (res: Response, body: any, msg: string): boolean {
        res.status(200).json({
            success: 1,
            code: 200,
            msg: msg,
            body: body
        });
        return false;
    },
    fail: function (res: Response, msg: string, status: number = 500): boolean {
        res.status(status).json({
            success: 0,
            code: status,
            msg: msg,
            body: {}
        });
        return false;
    },
    unauthorized: {
        success: 0,
        code: 401,
        msg: messageConstants.UNAUTHORIZED
    },
    tokenRequired: {
        success: 0,
        code: 400,
        msg: messageConstants.PROVIDE_TOKEN
    }
}

export default responseData;
