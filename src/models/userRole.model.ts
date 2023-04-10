import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The UserRole model manages user roles and permissions within the platform. It assigns a role
 * (e.g., Admin, Manager, Editor, Viewer) to each user for managing access levels.
 */

export interface IUserRole extends Document {
  userId: IUser["_id"];
  role: string;
}

const UserRoleSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Manager", "Editor", "Viewer"],
  },
});

export default mongoose.model<IUserRole>("UserRole", UserRoleSchema);
