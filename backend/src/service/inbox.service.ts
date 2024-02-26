import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import InboxModel, { InboxDocument, InboxInput } from "../models/inbox.model";

export async function createInbox(input: InboxInput) {
  const result = await InboxModel.create(input);
  return result;
}

export async function findInbox(query: FilterQuery<InboxDocument>, options: QueryOptions = { lean: true }) {
  const result = await InboxModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateInbox(query: FilterQuery<InboxDocument>, update: UpdateQuery<InboxDocument>, options: QueryOptions) {
  return InboxModel.findOneAndUpdate(query, update, options);
}

export async function deleteInbox(query: FilterQuery<InboxDocument>) {
  return InboxModel.deleteOne(query);
}

export async function findAllInbox() {
  const result = await InboxModel.find();
  return result;
}
