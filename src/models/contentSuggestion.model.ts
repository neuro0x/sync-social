import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The ContentSuggestion model stores AI-generated content recommendations. This includes suggested
 * topics, formats, and hashtags, as well as optimal posting times and frequencies.
 */

export interface IContentSuggestion extends Document {
  userId: IUser["_id"];
  topic: string;
  format?: string;
  hashtags: string[];
  suggestedTime?: Date;
  accepted: boolean;
  rejected: boolean;
}

const ContentSuggestionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true },
  format: { type: String, enum: ["video", "image"] },
  hashtags: [{ type: String }],
  suggestedTime: { type: Date },
  accepted: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
});

export default mongoose.model<IContentSuggestion>(
  "ContentSuggestion",
  ContentSuggestionSchema
);
