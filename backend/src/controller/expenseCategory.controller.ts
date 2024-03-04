import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateExpenseCategoryInput, UpdateExpenseCategoryInput } from "../schema/expenseCategory.schema";
import { findExpenseCategory, createExpenseCategory, findAllExpenseCategory, findAndUpdateExpenseCategory, deleteExpenseCategory } from "../service/expenseCategory.service";
var colors = require("colors");

export async function createExpenseCategoryHandler(req: Request<{}, {}, CreateExpenseCategoryInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const alreadyExist = await findExpenseCategory({ name: body.name });

    if (alreadyExist) {
      next(new AppError(`ExpenseCategory with the name (${body.name}) already exist`, 404));
      return;
    }

    const item = await createExpenseCategory(body);
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpenseCategoryHandler(req: Request<{}, {}, {}>, res: Response, next: NextFunction) {
  try {
    const queryParameters = req.query; // /categories?status=active

    const results = await findAllExpenseCategory(queryParameters);
    return res.json({
      status: "success",
      msg: "Get all success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getExpenseCategoryHandler(req: Request<UpdateExpenseCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expenseCategoryId = req.params.expenseCategoryId;
    const item = await findExpenseCategory({ expenseCategoryId });

    if (!item) {
      next(new AppError("ExpenseCategory does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateExpenseCategoryHandler(req: Request<UpdateExpenseCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expenseCategoryId = req.params.expenseCategoryId;
    const item = await findExpenseCategory({ expenseCategoryId });

    if (!item) {
      next(new AppError("ExpenseCategory does not exist", 404));
      return;
    }

    const updated = await findAndUpdateExpenseCategory({ expenseCategoryId }, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      msg: "Update success",
      data: updated,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteExpenseCategoryHandler(req: Request<UpdateExpenseCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expenseCategoryId = req.params.expenseCategoryId;
    const item = await findExpenseCategory({ expenseCategoryId });

    if (!item) {
      next(new AppError("ExpenseCategory does not exist", 404));
      return;
    }

    await deleteExpenseCategory({ expenseCategoryId });
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
