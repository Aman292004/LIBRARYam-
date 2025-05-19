import express from "express";
import Order from "../models/order.model.js";
import Book from "../models/book.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalSalesResult = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);
    const totalSales =
      totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

    const trendingBooksCount = await Book.countDocuments({ trending: true });

    const totalBooks = await Book.countDocuments();

    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalOrders,
      totalSales,
      trendingBooks: trendingBooksCount,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

export default router;
