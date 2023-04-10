import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The ContentCalendar model represents the AI-driven content calendar, which contains suggested
 * posting schedules for users. It stores the date, platform, and content suggestion ID for each
 * scheduled item.
 */

export interface IContentCalendar extends Document {
  userId: IUser["_id"];
  scheduledPosts: Schema.Types.ObjectId[];
}

const ContentCalendarSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  scheduledPosts: [{ type: Schema.Types.ObjectId, ref: "ScheduledPost" }],
});

export default mongoose.model<IContentCalendar>(
  "ContentCalendar",
  ContentCalendarSchema
);
