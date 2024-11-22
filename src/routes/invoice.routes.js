import { Router } from "express";
import {
  getInvoices,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from "../controllers/invoice.controller.js";
const router = Router();

router.route("/getinvoices").get(getInvoices);
router.route("/createInvoice").post(createInvoice);
router.route("/deleteInvoice/:_id").delete(deleteInvoice);
router.route("/updateInvoice/:_id").put(updateInvoice);

export { router };
