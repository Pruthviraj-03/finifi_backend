import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: "https://finifitask.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import { router as invoiceRouter } from "./src/routes/invoice.routes.js";

app.use("/api", invoiceRouter);

// http://localhost:8000/api/

export { app };
