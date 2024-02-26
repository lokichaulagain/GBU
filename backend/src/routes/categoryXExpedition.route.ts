import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCategoryXExpeditionHandler, updateCategoryXExpeditionHandler, getCategoryXExpeditionHandler, getAllCategoryXExpeditionHandler, deleteCategoryXExpeditionHandler, getAllCategoryXExpeditionByCategoryHandler } from "../controller/categoryXExpedition.controller";
import { createCategoryXExpeditionSchema, getCategoryXExpeditionSchema, deleteCategoryXExpeditionSchema } from "../schema/categoryXExpedition";
const router = express.Router();

router.post("/", [ validate(createCategoryXExpeditionSchema)], createCategoryXExpeditionHandler);
router.patch("/:categoryXExpeditionId", updateCategoryXExpeditionHandler);
router.get("/:categoryXExpeditionId", [ validate(getCategoryXExpeditionSchema)], getCategoryXExpeditionHandler);
router.get("/",  getAllCategoryXExpeditionHandler);
router.delete("/:categoryXExpeditionId", [ validate(deleteCategoryXExpeditionSchema)], deleteCategoryXExpeditionHandler);
router.get("/get-all-category-x-expedition-by-category/:categoryXExpeditionId", [ validate(getCategoryXExpeditionSchema)], getAllCategoryXExpeditionByCategoryHandler);

export default router;
