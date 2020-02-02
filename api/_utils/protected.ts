import {NowRequest, NowResponse} from '@now/node';
import * as jwt from 'jsonwebtoken';

// const withProtect = fn => async (req: NowRequest, res: NowResponse) => {
//     const token = req.headers.authorization.
//     jwt.verify(req.he)
//     fn(req, res);
// }