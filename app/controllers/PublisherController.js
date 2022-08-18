const mongoose = require("mongoose");
const Category = require("../../model/category");
const Publisher = require("../../model/publisher");

class PublisherController {
  async createPublisher(req, res) {
    try {
      Publisher.validate(req.body);
      const { name } = req.body;
      const newPublisher = await Publisher.create({
        name,
      });
      res.status(201).json(newPublisher);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const allPublisher = await Publisher.find();
      res.status(200).json(allPublisher);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PublisherController();
