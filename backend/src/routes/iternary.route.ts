import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createIternaryHandler, updateIternaryHandler, getIternaryHandler, getAllIternaryHandler, deleteIternaryHandler, getIternaryByExpeditionHandler } from "../controller/iternary.controller";
import { createIternarySchema, deleteIternarySchema, getIternarySchema } from "../schema/iternary.schema";

const router = express.Router();

router.post("/", [validate(createIternarySchema)], createIternaryHandler);
router.patch("/:iternaryId", updateIternaryHandler);
router.get("/:iternaryId", [validate(getIternarySchema)], getIternaryHandler);
router.get("/by-expeditionId/:iternaryId", [validate(getIternarySchema)], getIternaryByExpeditionHandler);
router.get("/", getAllIternaryHandler);
router.delete("/:iternaryId", [validate(deleteIternarySchema)], deleteIternaryHandler);

export default router;
