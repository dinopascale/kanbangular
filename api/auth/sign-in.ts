import { NowRequest, NowResponse } from '@now/node';
import { connectToDatabase } from '../_db/mongodb';
import { Collection } from 'mongodb';
import { User, IUser, user } from '../_db/models/users';

const signIn = async (req: NowRequest, res: NowResponse) => {

    const { password, email, name, surname }: user = req.body; 

    try {
        const db = await connectToDatabase(process.env.MONGODB_URI)

        const Users: Collection<IUser> = await db.collection('users');

        const alreadyExist = await Users.findOne({email})

        if (!!alreadyExist) { throw new Error('email already exist'); }

        const newUser = new User({email, password, name, surname})

        console.log(newUser);

        await newUser.save();
        
        console.log(newUser);
    
        res.status(200).json({newUser});
    } catch(e) {
        console.log(e)
        res.status(400).json({error: e});
    }
}

export default signIn;