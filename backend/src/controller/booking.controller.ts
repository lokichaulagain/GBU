import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateBookingInput, UpdateBookingInput } from "../schema/booking.schema";
import { createBooking, deleteBooking, findAllBooking, findAndUpdateBooking, findBooking } from "../service/booking.service";

var colors = require("colors");

export async function createBookingHandler(req: Request<{}, {}, CreateBookingInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const booking = await createBooking(body);
    return res.json({
      status: "success",
      msg: "Booking success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateBooking({ bookingId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostBooking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    await deleteBooking({ bookingId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllBooking();
    return res.json({
      status: "success",
      msg: "Get all booking success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
