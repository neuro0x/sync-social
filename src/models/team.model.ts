import mongoose, { Schema, Document } from "mongoose";

/**
 * The Team model is used to manage teams within the platform, allowing collaboration between users
 * with different roles and permissions. It includes the team name and member information.
 */

export interface ITeam extends Document {
  name: string;
  members: {
    userId: Schema.Types.ObjectId;
    role: string;
  }[];
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      role: {
        type: String,
        required: true,
        enum: ["Admin", "Manager", "Editor", "Viewer"],
      },
    },
  ],
});

export default mongoose.model<ITeam>("Team", TeamSchema);
