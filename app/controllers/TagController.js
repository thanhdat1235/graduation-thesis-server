const mongoose = require("mongoose");
const Tags = require("../../model/tag");
// const Post = require("../../model/posts");
const Category = require("../../model/category");
const Publisher = require("../../model/publisher");
const Supplier = require("../../model/supplier");

class TagController {
  async CreateTags(req, res) {
    const { name, categoryId, publisherId, supplierId } = req.body;
    try {
      if (!name || !categoryId || !publisherId || !supplierId)
        return res.status(404).send({ message: "All input is required" });
      const tag = await Tags.create({
        name: name,
        categories: categoryId,
        created_at: new Date(),
        publishers: publisherId,
        suppliers: supplierId,
      });
      const savePublisher = await Publisher.findByIdAndUpdate(
        { _id: publisherId },
        { tags: tag._id },
        { new: true }
      );
      const saveSupplier = await Supplier.findByIdAndUpdate(
        { _id: supplierId },
        { tags: tag._id },
        { new: true }
      );
      const saveCategory = await Category.findByIdAndUpdate(
        { _id: categoryId },
        { tags: tag._id },
        { new: true }
      );
      res.status(201).json({ tag, savePublisher, saveSupplier, saveCategory });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error server" });
    }
  }

  async findAll(req, res, next) {
    try {
      const allTags = await Tags.find();
      res.status(201).json(allTags);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TagController();
