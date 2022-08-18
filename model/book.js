// Model Post
const mongoose = require("mongoose");
Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schema:
 *    Book:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        created_at:
 *          type: string
 *          format: date-time
 *        tags:
 *          type: object
 *        categories:
 *          type: object
 *        reviews:
 *          type: integer
 *        avatar_photo:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: string
 *        amount:
 *           type: integer
 *        cover_photo:
 *           type: string
 *        form_style:
 *           type: string
 *        quantity_sold:
 *           type: integer
 *        suppliers:
 *           type: object
 *        publishers:
 *           type: object
 *        authors:
 *           type: object
 */

// Model user
const bookSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    dropDups: true,
  },
  name: { type: String, require: true },
  slugString: { type: String },
  reviews: { type: Number },
  created_at: { type: Date },
  avatar_photo: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: String, require: true },
  amount: { type: Number, require: true },
  cover_photo: { type: String },
  form_style: { type: String, require: true },
  quantity_sold: { type: Number },
  suppliers: { type: Schema.Types.ObjectId, ref: "Supplier" },
  publishers: { type: Schema.Types.ObjectId, ref: "Publisher" },
  authors: { type: Schema.Types.ObjectId, ref: "Author" },
  categories: { type: Schema.Types.ObjectId, ref: "Category" },
  tags: { type: Schema.Types.ObjectId, ref: "Tag" },
});
bookSchema.index({ "$**": "text" });
module.exports = mongoose.model("Book", bookSchema);
