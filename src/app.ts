import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import indexRoutes from "./routes/index";

// Initializations
const app: Application = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("filesFolder", "./files-json/");

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRoutes);

// this folders for this application will be used to store public file images
app.use("/uploads", express.static(path.resolve("uploads")));

export default app;
