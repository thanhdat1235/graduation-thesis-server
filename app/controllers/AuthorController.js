const mongoose = require("mongoose");
const Tags = require("../../model/tag");
// const Post = require("../../model/posts");
const Category = require("../../model/category");
const Author = require("../../model/author");

class AuthorController {
  async createAuthor(req, res) {
    try {
      Author.validate(req.body);
      const { name_author, introduce } = req.body;
      const author = await Author.create({
        name_author,
        introduce,
        created_at: new Date(),
      });
      res.status(201).json(author);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const allAuthor = await Author.find();
      res.status(200).json(allAuthor);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthorController();
