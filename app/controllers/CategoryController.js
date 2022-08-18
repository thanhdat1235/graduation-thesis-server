const mongoose = require("mongoose");
const Category = require("../../model/category");
const Publisher = require("../../model/publisher");
const Supplier = require("../../model/supplier");

class CategoryController {
  async CreateCategory(req, res) {
    const { name, publisherId, supplierId } = req.body;
    try {
      if (!name || !publisherId || !supplierId)
        return res.status(404).send({ message: "All input is required" });
      const category = await Category.create({
        name: name,
        publishers: publisherId,
        suppliers: supplierId,
        created_at: new Date(),
      });
      const savePublisher = await Publisher.findByIdAndUpdate(
        { _id: publisherId },
        { categories: category._id },
        { new: true }
      );
      const saveSupplier = await Supplier.findByIdAndUpdate(
        { _id: supplierId },
        { categories: category._id },
        { new: true }
      );
      res.status(201).json({ category, savePublisher, saveSupplier });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Error" });
    }
  }

  async findAll(req, res, next) {
    try {
      const allCategories = await Category.find();
      res.status(201).json(allCategories);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCategory(req, res) {
    try {
      const response = await Category.find();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();
