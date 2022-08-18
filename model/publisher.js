const mongoose = require("mongoose");
Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schema:
 *    Publisher:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        created_at:
 *          type: dateTime
 *        categories:
 *          type: array
 */

// Model user
const publisherSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    dropDups: true,
  },
  name: String,
  created_at: Date,
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  suppliers: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
});
publisherSchema.index({ "$**": "text" });
module.exports = mongoose.model("Publisher", publisherSchema);
