import express from "express";
import {
  createOrder,
  getOrderByEmail,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/email/:email", getOrderByEmail);

export default router;
