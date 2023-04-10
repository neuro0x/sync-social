import mongoose, { Schema, Document } from "mongoose";

/**
 * The User model stores information about registered users, including their email address,
 * password, and connected social media profiles.
 */

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  industry?: string;
  targetAudience?: string;
  socialProfiles: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  industry: { type: String },
  targetAudience: { type: String },
  socialProfiles: [{ type: Schema.Types.ObjectId, ref: "SocialProfile" }],
});

export default mongoose.model<IUser>("User", UserSchema);
