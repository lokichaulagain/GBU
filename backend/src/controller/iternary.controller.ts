import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateIternaryInput, UpdateIternaryInput } from "../schema/iternary.schema";
import { createIternary, deleteIternary, findAllIternary, findAndUpdateIternary, findIternary, findIternaryByExpedition } from "../service/iternary.service";
var colors = require("colors");

export async function createIternaryHandler(req: Request<{}, {}, CreateIternaryInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const iternary = await createIternary(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: iternary,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateIternaryHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const iternaryId = req.params.iternaryId;
    const iternary = await findIternary({ iternaryId });
    if (!iternary) {
      next(new AppError("iternary detail does not exist", 404));
      return;
    }

    const updatedIternary = await findAndUpdateIternary(
      { iternaryId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedIternary,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getIternaryHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const iternaryId = req.params.iternaryId;
    const iternary = await findIternary({ iternaryId });

    if (!iternary) {
      next(new AppError("iternary does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: iternary,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getIternaryByExpeditionHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.iternaryId;
    const iternarnaries = await findIternaryByExpedition({ expedition: expeditionId });
    console.log(iternarnaries);

    return res.json({
      status: "success",
      msg: "Get success",
      data: iternarnaries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteIternaryHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const iternaryId = req.params.iternaryId;
    const iternary = await findIternary({ iternaryId });

    if (!iternary) {
      next(new AppError("iternary does not exist", 404));
    }

    await deleteIternary({ iternaryId });
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

export async function getAllIternaryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllIternary();
    return res.json({
      status: "success",
      msg: "Get all iternary success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
