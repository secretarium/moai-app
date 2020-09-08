import { model, Schema, Document } from 'mongoose';
import Node from './node.interface';

const nodeSchema = new Schema(
    {
        address: String
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const nodeModel = model<Node & Document>('Node', nodeSchema);

export default nodeModel;
