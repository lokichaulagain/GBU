import express from "express";
import { validate } from "../middleware/validateResource";
import { requireAdmin } from "../middleware/requireAdmin";
import { createInboxHandler, updateInboxHandler, getInboxHandler, getAllInboxHandler, deleteInboxHandler } from "../controller/inbox.controller";
import { createInboxSchema, getInboxSchema, deleteInboxSchema } from "../schema/inbox.schema";
const router = express.Router();

router.post("/", [validate(createInboxSchema)], createInboxHandler);
router.patch("/:inboxId",  updateInboxHandler);
router.get("/:inboxId", [ validate(getInboxSchema)], getInboxHandler);
router.get("/",  getAllInboxHandler);
router.delete("/:inboxId", [ validate(deleteInboxSchema)], deleteInboxHandler);
export default router;
