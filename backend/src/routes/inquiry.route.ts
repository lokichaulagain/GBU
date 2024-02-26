import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createInquiryHandler, deleteInquiryHandler, getAllInquiryHandler, getInquiryHandler, updateInquiryHandler } from "../controller/inquiry.controller";
import { createInquirySchema, deleteInquirySchema, getInquirySchema } from "../schema/inquiry.schema";

const router = express.Router();

router.post("/", [ validate(createInquirySchema)], createInquiryHandler);
router.patch("/:inquiryId",  updateInquiryHandler);
router.get("/:inquiryId", [validate(getInquirySchema)], getInquiryHandler);
router.get("/", getAllInquiryHandler);
router.delete("/:inquiryId", [ validate(deleteInquirySchema)], deleteInquiryHandler);

export default router;
