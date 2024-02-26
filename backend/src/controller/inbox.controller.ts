import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { createInbox, findInbox, findAndUpdateInbox, deleteInbox, findAllInbox } from "../service/inbox.service";
import { CreateInboxInput, UpdateInboxInput } from "../schema/inbox.schema";

var colors = require("colors");

export async function createInboxHandler(req: Request<{}, {}, CreateInboxInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const inbox = await createInbox(body);
    return res.json({
      status: "success",
      msg: "Message sent success",
      data: inbox,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateInboxHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("inbox does not exist", 404));
      return;
    }

    const updatedCostInbox = await findAndUpdateInbox({ inboxId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostInbox,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getInboxHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("inbox does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: inbox,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteInboxHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("inbox does not exist", 404));
    }

    await deleteInbox({ inboxId });
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

export async function getAllInboxHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllInbox();
    return res.json({
      status: "success",
      msg: "Get all inbox success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
