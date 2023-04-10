import mongoose, { Schema, Document } from "mongoose";

/**
 * The Template model stores design templates for various social media platforms and post types. It
 * includes information like name, type, platform, imageUrl, and elements.
 */

export interface ITemplate extends Document {
  name: string;
  type: string;
  platform: string;
  imageUrl: string;
  elements: {
    type: string;
    properties: any;
  }[];
}

const TemplateSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["image", "video", "carousel"] },
  platform: {
    type: String,
    required: true,
    enum: ["Facebook", "Instagram", "Twitter", "YouTube", "General"],
  },
  imageUrl: { type: String, required: true },
  elements: [
    {
      type: { type: String, required: true },
      properties: { type: Schema.Types.Mixed },
    },
  ],
});

export default mongoose.model<ITemplate>("Template", TemplateSchema);
