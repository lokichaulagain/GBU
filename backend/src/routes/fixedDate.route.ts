import express from "express";
import { validate } from "../middleware/validateResource";
import { createFixedDateHandler, updateFixedDateHandler, getFixedDateHandler, getAllFixedDateHandler, deleteFixedDateHandler, getFixedDateByExpeditionHandler } from "../controller/fixedDate.controller";
import { getFixedDateSchema, deleteFixedDateSchema, createFixedDateSchema } from "../schema/fixedDate.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.post("/", [ validate(createFixedDateSchema)], createFixedDateHandler);
router.patch("/:fixedDateId",  updateFixedDateHandler);
router.get("/:fixedDateId", [validate(getFixedDateSchema)], getFixedDateHandler);
router.get("/", getAllFixedDateHandler);
router.delete("/:fixedDateId", [ validate(deleteFixedDateSchema)], deleteFixedDateHandler);

router.get("/by-expeditionId/:expeditionId",  getFixedDateByExpeditionHandler);
export default router;
