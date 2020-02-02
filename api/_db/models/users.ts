import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs';
import validator from 'validator';

export interface IUser extends mongoose.Document {
    name: string; 
    surname: string;
    email: string;
    password: string;
    findByCredentials(): Promise<IUser>;
  };

export interface user {
    name: string; 
    surname: string;
    email: string;
    password: string;
}
  

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'Email is invalid'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    }
})

userSchema.statics.findByCredentials = async (email, password): Promise<IUser> => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
       throw new Error('Unable to login')       
    }

    return user;
}


userSchema.pre('save', async function (next) {
    const user = <IUser>this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

export const User = mongoose.model<IUser>('User', userSchema)