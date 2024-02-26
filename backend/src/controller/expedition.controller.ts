import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateExpeditionInput, UpdateExpeditionInput } from "../schema/expedition.schema";
import { createExpedition, findExpedition, findAndUpdateExpedition, deleteExpedition, findAllExpedition, findAllExpeditionByType, findAllExpeditionByMeter } from "../service/expedition.service";
var colors = require("colors");

export async function createExpeditionHandler(req: Request<{}, {}, CreateExpeditionInput["body"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    const banner = files["banner"][0];
    const routeMap = files["routeMap"][0];

    const front = await uploadSingleFile(banner);
    const back = await uploadSingleFile(routeMap);

    const body = req.body;
    const expedition = await createExpedition({ ...body, banner: front, routeMap: back });
    return res.json({
      status: "success",
      msg: "Create success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateExpeditionHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });
    if (!expedition) {
      next(new AppError("expedition detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = expedition.banner;
    if (files && files["banner"]) {
      const banner = files["banner"][0];
      img1 = await uploadSingleFile(banner);
    }

    let img2 = expedition.routeMap;
    if (files && files["routeMap"]) {
      const routeMap = files["routeMap"][0];
      img2 = await uploadSingleFile(routeMap);
    }

    const updatedExpedition = await findAndUpdateExpedition(
      { expeditionId },
      { ...req.body, banner: img1, routeMap: img2 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedExpedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getExpeditionHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteExpeditionHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    await deleteExpedition({ expeditionId });
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

export async function getAllExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllExpedition();
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

export async function getAllExpeditionByTypeHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const type = req.params.expeditionId;
    const expeditions = await findAllExpeditionByType({ type });
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpeditionByMeterHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const meter = req.params.meter;
    const expeditions = await findAllExpeditionByMeter({ meter });
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
