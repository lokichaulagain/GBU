import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCostIncludeHandler, updateCostIncludeHandler, getCostIncludeHandler, getAllCostIncludeHandler, deleteCostIncludeHandler, getCostIncludeByExpeditionHandler } from "../controller/costInclude.controller";
import { createCostIncludeSchema, getCostIncludeSchema, deleteCostIncludeSchema } from "../schema/costInclude.schema";

const router = express.Router();

router.post("/", [validate(createCostIncludeSchema)], createCostIncludeHandler);
router.patch("/:costIncludeId", updateCostIncludeHandler);
router.get("/:costIncludeId", [validate(getCostIncludeSchema)], getCostIncludeHandler);

router.get("/by-expiditionId/:costIncludeId", [validate(getCostIncludeSchema)], getCostIncludeByExpeditionHandler);
router.get("/", getAllCostIncludeHandler);
router.delete("/:costIncludeId", [validate(deleteCostIncludeSchema)], deleteCostIncludeHandler);

export default router;
