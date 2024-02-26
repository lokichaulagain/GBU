import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateCategoryXExpeditionInput, UpdateCategoryXExpeditionInput } from "../schema/categoryXExpedition";
import { createCategoryXExpedition, findCategoryXExpedition, findAndUpdateCategoryXExpedition, deleteCategoryXExpedition, findAllCategoryXExpedition, findAllCategoryXExpeditionByCategory } from "../service/categoryXExpedition.service";
var colors = require("colors");

export async function createCategoryXExpeditionHandler(req: Request<{}, {}, CreateCategoryXExpeditionInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const categoryId = req.body.category;
    const expeditionId = req.body.expedition;
    const existingItem = await findCategoryXExpedition({ category: categoryId, expedition: expeditionId });

    if (existingItem) {
      next(new AppError("Already exist", 400));
      return;
    }

    const data = await createCategoryXExpedition({ ...body });
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: data,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCategoryXExpeditionHandler(req: Request<UpdateCategoryXExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryXExpeditionId = req.params.categoryXExpeditionId;
    const item = await findCategoryXExpedition({ categoryXExpeditionId });

    if (!item) {
      next(new AppError("Item does not exist", 404));
      return;
    }

    const updatedCategory = await findAndUpdateCategoryXExpedition(
      { categoryXExpeditionId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getCategoryXExpeditionHandler(req: Request<UpdateCategoryXExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryXExpeditionId = req.params.categoryXExpeditionId;
    const category = await findCategoryXExpedition({ categoryXExpeditionId });

    if (!category) {
      next(new AppError("category does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteCategoryXExpeditionHandler(req: Request<UpdateCategoryXExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryXExpeditionId = req.params.categoryXExpeditionId;
    const category = await findCategoryXExpedition({ categoryXExpeditionId });

    if (!category) {
      next(new AppError("category does not exist", 404));
    }

    await deleteCategoryXExpedition({ categoryXExpeditionId });
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

export async function getAllCategoryXExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllCategoryXExpedition();
    return res.json({
      status: "success",
      msg: "Get all category success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllCategoryXExpeditionByCategoryHandler(req: Request<UpdateCategoryXExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryId = req.params.categoryXExpeditionId;
    const categories = await findAllCategoryXExpeditionByCategory({ category: categoryId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: categories,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
