const mongoose = require("mongoose");
Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schema:
 *    Category:
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
 *        tags:
 *          type: array
 */

// Model user
const categorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    dropDups: true,
  },
  name: String,
  created_at: Date,
  publishers: { type: Schema.Types.ObjectId, ref: "Publisher" },
  suppliers: { type: Schema.Types.ObjectId, ref: "Supplier" },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});
categorySchema.index({ "$**": "text" });
module.exports = mongoose.model("Category", categorySchema);
