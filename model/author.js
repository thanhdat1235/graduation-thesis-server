const mongoose = require("mongoose");
Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schema:
 *    Author:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name_author:
 *          type: string
 *        created_at:
 *          type: dateTime
 *        introduce:
 *          type: string
 *        books:
 *          type: array
 */

// Model user
const authorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    dropDups: true,
  },
  name_author: { type: String, required: true },
  created_at: { type: Date },
  introduce: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});
authorSchema.index({ "$**": "text" });
module.exports = mongoose.model("Author", authorSchema);
