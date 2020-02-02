import { NowRequest, NowResponse } from '@now/node';
import { connectToDatabase } from '../_db/mongodb';
import { Collection } from 'mongodb';
import { User } from '../_db/models/users';
import * as jwt from 'jsonwebtoken';

const signIn = async (req: NowRequest, res: NowResponse) => {

    const { password, email, name, surname }: {password: string, email: string, name: string, surname: string} = req.body;

    try {
        await connectToDatabase(process.env.MONGODB_URI)

        const doc = new User({email, password, surname, name})

        await doc.save();

        const token = jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: '1h'})
            
        res.status(200).send({id: doc._id, token});

    } catch(e) {

        res.status(400).send({error: e.message});
    
    }
}

export default signIn;