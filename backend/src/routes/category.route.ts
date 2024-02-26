import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCategoryHandler, updateCategoryHandler, getCategoryHandler, getAllCategoryHandler, deleteCategoryHandler } from "../controller/category.controller";
import { createCategorySchema, getCategorySchema, deleteCategorySchema } from "../schema/category.schema";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/", [ upload.single("image"), validate(createCategorySchema)], createCategoryHandler);
router.patch("/:categoryId", [ upload.single("image")], updateCategoryHandler);
router.get("/:categoryId", [ validate(getCategorySchema)], getCategoryHandler);
router.get("/",  getAllCategoryHandler);
router.delete("/:categoryId", [ validate(deleteCategorySchema)], deleteCategoryHandler);

export default router;
