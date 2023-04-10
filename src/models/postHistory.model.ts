import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The PostHistory model stores a history of published posts on various social media platforms. It
 * includes information like the platform, content, and time of posting.
 */

export interface IPostHistory extends Document {
  userId: IUser["_id"];
  postId: string;
  platform: string;
  content: string;
  createdTime: Date;
}

const PostHistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: String, required: true },
  platform: {
    type: String,
    required: true,
    enum: ["Facebook", "Instagram", "Twitter", "YouTube"],
  },
  content: { type: String, required: true },
  createdTime: { type: Date, default: Date.now },
});

export default mongoose.model<IPostHistory>("PostHistory", PostHistorySchema);
