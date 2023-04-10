import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The Analytics model stores the engagement data for individual posts across different social media
 * platforms. It includes information like likes, comments, shares, retweets, and views.
 */

export interface IAnalytics extends Document {
  userId: IUser["_id"];
  platform: string;
  postId: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    retweets: number;
    views: number;
  };
  timestamp: Date;
}

const AnalyticsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  platform: {
    type: String,
    required: true,
    enum: ["Facebook", "Instagram", "Twitter", "YouTube"],
  },
  postId: { type: String, required: true },
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    retweets: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
