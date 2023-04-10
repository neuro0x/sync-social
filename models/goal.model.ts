import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The Goal model stores user-defined goals for specific performance metrics (e.g., follower growth,
 * engagement). It includes the metric, target value, start and end dates, and progress.
 */

export interface IGoal extends Document {
  userId: IUser["_id"];
  metric: string;
  targetValue: number;
  startDate: Date;
  endDate: Date;
  progress: number;
}

const GoalSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  metric: { type: String, required: true },
  targetValue: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  progress: { type: Number, default: 0 },
});

export default mongoose.model<IGoal>("Goal", GoalSchema);
