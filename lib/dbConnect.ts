import mongoose from "mongoose";

declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const globalWithMongoose = global as typeof global & {
    mongoose?: {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
    };
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (globalWithMongoose.mongoose!.conn) {
        return globalWithMongoose.mongoose!.conn;
    }

    if (!globalWithMongoose.mongoose!.promise) {
        globalWithMongoose.mongoose!.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance);
    }

    globalWithMongoose.mongoose!.conn = await globalWithMongoose.mongoose!.promise;
    return globalWithMongoose.mongoose!.conn;
}

export default dbConnect;
