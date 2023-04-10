import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The CustomAsset model stores user-uploaded assets such as images, icons, fonts, and videos. It
 * includes metadata like name, type, and URL.
 */

export interface ICustomAsset extends Document {
  userId: IUser["_id"];
  name: string;
  type: string;
  url: string;
}

const CustomAssetSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["image", "icon", "font", "video"],
  },
  url: { type: String, required: true },
});

export default mongoose.model<ICustomAsset>("CustomAsset", CustomAssetSchema);
