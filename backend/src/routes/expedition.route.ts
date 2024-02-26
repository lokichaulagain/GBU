import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createExpeditionHandler, updateExpeditionHandler, getExpeditionHandler, getAllExpeditionHandler, deleteExpeditionHandler, getAllExpeditionByTypeHandler, getAllExpeditionByMeterHandler } from "../controller/expedition.controller";
import { getExpeditionSchema, deleteExpeditionSchema, createExpeditionSchema } from "../schema/expedition.schema";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "routeMap", maxCount: 1 },
    ]),
    validate(createExpeditionSchema),
  ],
  createExpeditionHandler
);

router.patch(
  "/:expeditionId",
  [
    requireAdmin,
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "routeMap", maxCount: 1 },
    ]),
  ],
  updateExpeditionHandler
);
router.get("/:expeditionId", [validate(getExpeditionSchema)], getExpeditionHandler);
router.get("/", getAllExpeditionHandler);
router.delete("/:expeditionId", [validate(deleteExpeditionSchema)], deleteExpeditionHandler);
router.get("/by-type/:expeditionId", getAllExpeditionByTypeHandler);
router.get("/by-meter/:meter", getAllExpeditionByMeterHandler);

export default router;
