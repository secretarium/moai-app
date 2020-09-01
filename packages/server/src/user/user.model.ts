import { model, Schema, Document } from 'mongoose';
import User from './user.interface';

const userSchema = new Schema(
    {
        email: String,
        password: {
            type: String,
            get: (): undefined => undefined
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
