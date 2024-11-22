import dotenv from "dotenv";
import { connectDB } from "./src/configs/db.js";
import { Invoices } from "./src/models/invoice.model.js";
import fs from "fs/promises";

dotenv.config({
  path: "./.env",
});

const loadData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    throw error;
  }
};

const invoices = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    const invoicesData = await loadData("./invoices.json");
    await Invoices.create(invoicesData);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

invoices();
