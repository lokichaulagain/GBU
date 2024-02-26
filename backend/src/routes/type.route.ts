import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createTypeHandler, updateTypeHandler, getTypeHandler, getAllTypeHandler, deleteTypeHandler } from "../controller/type.controller";
import { createTypeSchema, getTypeSchema, deleteTypeSchema } from "../schema/type.schema";
const router = express.Router();

router.post("/", [upload.single("image"), validate(createTypeSchema)], createTypeHandler);
router.patch("/:typeId", [upload.single("image")], updateTypeHandler);
router.get("/:typeId", [validate(getTypeSchema)], getTypeHandler);
router.get("/", getAllTypeHandler);
router.delete("/:typeId", [validate(deleteTypeSchema)], deleteTypeHandler);

export default router;
