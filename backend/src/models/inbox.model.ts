import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface InboxInput {
  fullName: string;
  email: string;
  address: string;
  message: string;
}

export interface InboxDocument extends InboxInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const inboxSchema = new mongoose.Schema(
  {
    inboxId: {
      type: String,
      required: true,
      unique: true,
      default: () => `inbox_${nanoid()}`,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InboxModel = mongoose.model<InboxDocument>("Inbox", inboxSchema);

export default InboxModel;
