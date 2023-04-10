import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The SocialProfile model stores users' connected social media profiles, including access tokens
 * and other necessary data for API communication with each platform.
 */

export interface ISocialProfile extends Document {
  platform: string;
  userId: IUser["_id"];
  accessToken: string;
  refreshToken?: string;
  expiresIn?: Date;
  profileId: string;
  username?: string;
  displayName?: string;
}

const SocialProfileSchema: Schema = new Schema({
  platform: {
    type: String,
    required: true,
    enum: ["Facebook", "Instagram", "Twitter", "YouTube"],
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  expiresIn: { type: Date },
  profileId: { type: String, required: true },
  username: { type: String },
  displayName: { type: String },
});

export default mongoose.model<ISocialProfile>(
  "SocialProfile",
  SocialProfileSchema
);
