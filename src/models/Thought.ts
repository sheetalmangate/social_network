import { Schema, model, Document, ObjectId, Types } from 'mongoose';

interface IReaction extends Document {

    reactionId : ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date 

}

interface IThought extends Document {
    _id: ObjectId;
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions?: IReaction[];
}

const reactionSchema = new Schema<IReaction>(
    {

        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280 
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now 

        }
        
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {type: String, required: true,  minLength:1, maxLength: 280 },
        createdAt: {type:Date, default: Date.now },
        username: {type: String, required: true, },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

// Create a virtual property `reactionCount` that gets the number of reaction for thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});


//Initialize thought model
const Thought = model('thought', thoughtSchema);

export default Thought;