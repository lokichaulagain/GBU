import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BookingModel, { BookingDocument, BookingInput } from "../models/booking.model";

export async function createBooking(input: BookingInput) {
  const result = await BookingModel.create(input);
  return result;
}

export async function findBooking(query: FilterQuery<BookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await BookingModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateBooking(query: FilterQuery<BookingDocument>, update: UpdateQuery<BookingDocument>, options: QueryOptions) {
  return BookingModel.findOneAndUpdate(query, update, options);
}

export async function deleteBooking(query: FilterQuery<BookingDocument>) {
  return BookingModel.deleteOne(query);
}

export async function findAllBooking() {
  const result = await BookingModel.find().populate("expedition")
  return result;
}
