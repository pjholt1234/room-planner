import mongoose from 'mongoose';

const schemas: Record<string, mongoose.SchemaDefinition> = {
    User: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    Plan: {}
};

export default schemas;