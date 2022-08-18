const mongoose = require("mongoose");
const Tags = require("../../model/tag");
const Category = require("../../model/category");
const Author = require("../../model/author");
const Publisher = require("../../model/publisher");
const Supplier = require("../../model/supplier");
const Book = require("../../model/book");
const slugify = require("../../ultils/replaceURL");

class BookController {
  async createBook(req, res) {
    try {
      Book.validate(req.body);
      const {
        name,
        avatar_photo,
        description,
        price,
        amount,
        form_style,
        supplierId,
        publisherId,
        authorId,
        categoryId,
        tagId,
      } = req.body;
      if (!publisherId || !supplierId || !categoryId || !authorId || !tagId)
        return res.status(400).send({ message: "All input is require" });
      const slugString = slugify(name);
      const time = new Date().getTime();
      const newBook = await Book.create({
        name,
        slugString: slugString + "-" + time,
        reviews: 3,
        created_at: new Date(),
        avatar_photo,
        description,
        price,
        amount,
        form_style,
        quantity_sold: 0,
        publishers: publisherId,
        suppliers: supplierId,
        authors: authorId,
        categories: categoryId,
        tags: tagId,
      });
      const savePublisher = await Publisher.findByIdAndUpdate(
        { _id: publisherId },
        { books: newBook._id },
        { new: true }
      );
      const saveSupplier = await Supplier.findByIdAndUpdate(
        { _id: supplierId },
        { books: newBook._id },
        { new: true }
      );
      const saveCategory = await Category.findByIdAndUpdate(
        { _id: categoryId },
        { books: newBook._id },
        { new: true }
      );
      const saveTag = await Tags.findByIdAndUpdate(
        { _id: tagId },
        { books: newBook._id },
        { new: true }
      );
      const saveAuthor = await Author.findByIdAndUpdate(
        { _id: authorId },
        { books: newBook._id },
        { new: true }
      );
      res
        .status(201)
        .json(
          newBook,
          savePublisher,
          saveSupplier,
          saveCategory,
          saveTag,
          saveAuthor
        );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const allBook = await Book.find().populate(["authors"]);
      res.status(200).json(allBook);
    } catch (error) {
      console.log(error);
    }
  }

  async featuredBook(req, res) {
    try {
      const result = await Book.find().populate(["authors"]).limit(5);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async saleBook(req, res) {
    try {
      const result = await Book.find().populate(["authors"]).skip(5).limit(5);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async findBookById(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "Invalid id book" });
    }
    try {
      const result = await Book.findById(id).populate("authors");
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async similarBook(req, res, next) {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "Invalid id book" });
    }
    try {
      const result = await Book.find({ categories: id }).populate(["authors"]);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBook(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "Invalid id book" });
    }
    try {
      await Book.findByIdAndDelete(id);
      res.status(200).send({ message: "Delete successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "Invalid id book" });
    }
    const dataUpdate = req.body;
    try {
      const result = await Book.findByIdAndUpdate({ _id: id }, dataUpdate);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BookController();
