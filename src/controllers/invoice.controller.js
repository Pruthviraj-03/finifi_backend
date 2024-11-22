import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { Invoices } from "../models/invoice.model.js";

const getInvoices = asyncHandler(async (req, res) => {
  try {
    const invoices = await Invoices.find();

    res.json(new ApiResponse(200, { invoices }, "Invoice get successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Server error");
  }
});

const createInvoice = asyncHandler(async (req, res) => {
  try {
    const {
      vendorName,
      invoiceNumber,
      status,
      netAmount,
      invoiceDate,
      dueDate,
      department,
      poNumber,
      createdTime,
      createdDate,
    } = req.body;

    if (
      !vendorName ||
      !invoiceNumber ||
      !netAmount ||
      !invoiceDate ||
      !dueDate ||
      !department ||
      !poNumber
    ) {
      res.json(
        new ApiResponse(400, {}, "All required fields must be provided")
      );
    }

    const newInvoice = new Invoices({
      vendorName,
      invoiceNumber,
      status,
      netAmount,
      invoiceDate,
      dueDate,
      department,
      poNumber,
      createdTime,
      createdDate,
    });

    await newInvoice.save();

    res.json(
      new ApiResponse(
        201,
        { invoice: newInvoice },
        "Invoice created successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Error creating invoice");
  }
});

const deleteInvoice = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedInvoice = await Invoices.findByIdAndDelete(_id);

    if (!deletedInvoice) {
      res.json(new ApiResponse(404, {}, "Invoice not found"));
    }

    res.json(
      new ApiResponse(
        200,
        { invoice: deletedInvoice },
        "Invoice deleted successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Error deleting invoice");
  }
});

const updateInvoice = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    const invoiceData = await req.body;

    const updatedInvoice = await Invoices.findByIdAndUpdate(_id, invoiceData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      res.json(new ApiResponse(404, {}, "Invoice not found"));
    }

    res.json(
      new ApiResponse(
        200,
        { invoice: updatedInvoice },
        "Invoice updated successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Error updating invoice");
  }
});

export { getInvoices, createInvoice, deleteInvoice, updateInvoice };
