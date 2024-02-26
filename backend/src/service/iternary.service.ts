import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import IternaryModel, { IternaryDocument, IternaryInput } from "../models/iternary";

export async function createIternary(input: IternaryInput) {
  const result = await IternaryModel.create(input);
  return result;
}

export async function findIternary(query: FilterQuery<IternaryDocument>, options: QueryOptions = { lean: true }) {
  const result = await IternaryModel.findOne(query, {}, options);
  return result;
}

export async function findIternaryByExpedition(query: FilterQuery<IternaryDocument>, options: QueryOptions = { lean: true }) {
  const results = await IternaryModel.find(query, {}, options);
  return results;
}

export async function findAndUpdateIternary(query: FilterQuery<IternaryDocument>, update: UpdateQuery<IternaryDocument>, options: QueryOptions) {
  return IternaryModel.findOneAndUpdate(query, update, options);
}

export async function deleteIternary(query: FilterQuery<IternaryDocument>) {
  return IternaryModel.deleteOne(query);
}

export async function findAllIternary() {
  const result = await IternaryModel.find();
  return result;
}
