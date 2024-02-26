import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryXExpeditionModel, { CategoryXExpeditionDocument, CategoryXExpeditionInput } from "../models/CategoryXExpedition";

export async function createCategoryXExpedition(input: CategoryXExpeditionInput) {
  const result = await CategoryXExpeditionModel.create(input);
  return result;
}

export async function findCategoryXExpedition(query: FilterQuery<CategoryXExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await CategoryXExpeditionModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateCategoryXExpedition(query: FilterQuery<CategoryXExpeditionDocument>, update: UpdateQuery<CategoryXExpeditionDocument>, options: QueryOptions) {
  return CategoryXExpeditionModel.findOneAndUpdate(query, update, options);
}

export async function deleteCategoryXExpedition(query: FilterQuery<CategoryXExpeditionDocument>) {
  return CategoryXExpeditionModel.deleteOne(query);
}

export async function findAllCategoryXExpedition() {
  const result = await CategoryXExpeditionModel.find();
  return result;
}


export async function findAllCategoryXExpeditionByCategory(query: FilterQuery<CategoryXExpeditionDocument>) {
  const results = await CategoryXExpeditionModel.find(query).populate({
    path:"expedition",
    select:"name meter banner description "
  });
  return results;
}


