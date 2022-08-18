const mongoose = require("mongoose");
Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schema:
 *    supplier:
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
const supplierSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    dropDups: true,
  },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  publishers: { type: Schema.Types.ObjectId, ref: "Publisher" },
});
supplierSchema.index({ "$**": "text" });
module.exports = mongoose.model("Supplier", supplierSchema);
