import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs';
import validator from 'validator';

export interface IUserDocument extends mongoose.Document {
    name: string; 
    surname: string;
    email: string;
    password: string;
    findByCredentials(email: string, password: string): Promise<IUserDocument>;
  };

export interface IUserModel extends mongoose.Model<IUserDocument> {
    findByCredentials(email: string, password: string): Promise<IUserDocument>;
}

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
        unique: [true, 'Email already exist'],
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
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

userSchema.statics.findByCredentials = async (email, password): Promise<IUserDocument> => {
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
    const user = <IUserDocument>this

    if (!user.isModified('password')) {
        return next();
    }

    user.password = await bcrypt.hash(user.password, 8);
    next();
})

userSchema.post('save', function(err, doc, next) {
    if(err.name === 'MongoError' && err.code === 11000) {
        next(new Error('Email must be unique'))
    } else {
        next(err);
    }
})

export const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema)