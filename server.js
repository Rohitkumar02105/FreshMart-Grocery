import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./backend/config/jb.js";
import productRoutes from "./backend/routes/productRoutes.js";
import userRoutes from "./backend/routes/userRoutes.js";
import orderRoutes from "./backend/routes/orderRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.warn("MONGO_URI not set. FreshMart will serve demo products only.");
}

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET not set. Authentication endpoints are unavailable.");
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FreshMart Backend Running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const buildPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(buildPath));

app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
