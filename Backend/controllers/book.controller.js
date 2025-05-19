import Book from "../models/book.model.js";

export const createBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({ message: "Book posted", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "failed Book posted" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "failed to fetch books" });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "failed to fetch book" });
  }
};

export const updateBook = async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404).send({ message: "Book not found" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).send({ message: "failed to update book" });
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book has been deleted" });
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};
