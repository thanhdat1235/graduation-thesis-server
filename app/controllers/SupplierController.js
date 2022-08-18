const mongoose = require("mongoose");
const Category = require("../../model/category");
const Supplier = require("../../model/supplier");
const Publisher = require("../../model/publisher");

class SupplierController {
  async createSupplier(req, res) {
    try {
      Supplier.validate(req.body);
      const { name, publisherId, phone_number, email } = req.body;
      if (!publisherId)
        return res.status(400).send({ message: "Publisher is require" });
      const newSupplier = await Supplier.create({
        name,
        phone_number,
        email,
        created_at: new Date(),
        publishers: publisherId,
      });
      const savePublisher = await Publisher.findByIdAndUpdate(
        { _id: publisherId },
        { suppliers: newSupplier._id },
        { new: true }
      );
      res.status(201).json({ newSupplier, savePublisher });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const allSupplier = await Supplier.find();
      res.status(200).json(allSupplier);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SupplierController();
