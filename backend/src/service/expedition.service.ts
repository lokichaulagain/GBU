import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ExpeditionModel, { ExpeditionDocument, ExpeditionInput } from "../models/expedition";

export async function createExpedition(input: ExpeditionInput) {
  const result = await ExpeditionModel.create(input);
  return result;
}

export async function findExpedition(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await ExpeditionModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateExpedition(query: FilterQuery<ExpeditionDocument>, update: UpdateQuery<ExpeditionDocument>, options: QueryOptions) {
  return ExpeditionModel.findOneAndUpdate(query, update, options);
}

export async function deleteExpedition(query: FilterQuery<ExpeditionDocument>) {
  return ExpeditionModel.deleteOne(query);
}

export async function findAllExpedition() {
  const result = await ExpeditionModel.find();
  return result;
}

export async function findAllExpeditionByType(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const results = await ExpeditionModel.find(query, {}, options);
  return results;
}


export async function findAllExpeditionByMeter(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const results = await ExpeditionModel.find(query, {}, options);
  return results;
}
