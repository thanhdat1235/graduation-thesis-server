const mongoose = require("mongoose");
Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schema:
 *    Tag:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        created_at:
 *          type: dateTime
 *        books:
 *          type: array
 *        categories:
 *          type: array
 */

// Model user
const tagsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    dropDups: true,
  },
  name: String,
  created_at: Date,
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  categories: { type: Schema.Types.ObjectId, ref: "Category" },
  publishers: { type: Schema.Types.ObjectId, ref: "Publisher" },
  suppliers: { type: Schema.Types.ObjectId, ref: "Supplier" },
});
tagsSchema.index({ "$**": "text" });
module.exports = mongoose.model("Tag", tagsSchema);
