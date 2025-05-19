import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order({ ...req.body });
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (error) {
    console.error("Error creating Order", error);
    res.status(500).json({ message: "Failed Creating Order" });
  }
};

export const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email })
      .sort({ createdAt: -1 })
      .populate({
        path: "productIds",
        select: "title coverImage",
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found!" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching Order", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
