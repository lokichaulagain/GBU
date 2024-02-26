import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { createCostInclude, deleteCostInclude, findAllCostInclude, findAndUpdateCostInclude, findCostInclude, findCostIncludeByExpedition } from "../service/costInclude.service";
import { CreateCostIncludeInput, UpdateCostIncludeInput } from "../schema/costInclude.schema";
var colors = require("colors");

export async function createCostIncludeHandler(req: Request<{}, {}, CreateCostIncludeInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const costInclude = await createCostInclude(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: costInclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCostIncludeHandler(req: Request<UpdateCostIncludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const costIncludeId = req.params.costIncludeId;
    const costInclude = await findCostInclude({ costIncludeId });
    if (!costInclude) {
      next(new AppError("costInclude detail does not exist", 404));
      return;
    }

    const updatedCostInclude = await findAndUpdateCostInclude({ costIncludeId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostInclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCostIncludeHandler(req: Request<UpdateCostIncludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const costIncludeId = req.params.costIncludeId;
    const costInclude = await findCostInclude({ costIncludeId });

    if (!costInclude) {
      next(new AppError("costInclude does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: costInclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCostIncludeByExpeditionHandler(req: Request<UpdateCostIncludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.costIncludeId;
    const results = await findCostIncludeByExpedition({ expedition: expeditionId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteCostIncludeHandler(req: Request<UpdateCostIncludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const costIncludeId = req.params.costIncludeId;
    const costInclude = await findCostInclude({ costIncludeId });

    if (!costInclude) {
      next(new AppError("costInclude does not exist", 404));
    }

    await deleteCostInclude({ costIncludeId });
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

export async function getAllCostIncludeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllCostInclude();
    return res.json({
      status: "success",
      msg: "Get all cost include success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
