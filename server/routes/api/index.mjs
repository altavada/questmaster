import express from "express";
import stylistRoutes from "./stylistRoutes.mjs";
const router = express.Router();

router.use("/stylists", stylistRoutes);

export default router;