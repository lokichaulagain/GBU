import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCostExcludeHandler, updateCostExcludeHandler, getCostExcludeHandler, getAllCostExcludeHandler, deleteCostExcludeHandler, getCostExcludeByExpeditionHandler } from "../controller/costExclude.controller";
import { createCostExcludeSchema, getCostExcludeSchema, deleteCostExcludeSchema } from "../schema/costExclude";

const router = express.Router();

router.post("/", [ validate(createCostExcludeSchema)], createCostExcludeHandler);
router.patch("/:costExcludeId",  updateCostExcludeHandler);
router.get("/:costExcludeId", [validate(getCostExcludeSchema)], getCostExcludeHandler);
router.get("/by-expiditionId/:costExcludeId", [validate(getCostExcludeSchema)], getCostExcludeByExpeditionHandler);
router.get("/", getAllCostExcludeHandler);
router.delete("/:costExcludeId", [ validate(deleteCostExcludeSchema)], deleteCostExcludeHandler);

export default router;
