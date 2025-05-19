import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";
import verifyAdminToken from "../utils/verifyAdminToken.js";

const router = express.Router();

router.post("/create-book", verifyAdminToken, createBook);
router.delete("/delete/:id", verifyAdminToken, deleteBook);
router.put("/update/:id", verifyAdminToken, updateBook);
router.get("/get/:id", getBook);
router.get("/get-books", getBooks);

export default router;
