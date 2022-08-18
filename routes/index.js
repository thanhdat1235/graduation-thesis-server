// const bookRouter = require("./post.route");
// const adminRouter = require("./admin.route");
// const contactRouter = require("./contact.route");
// const uploadRouter = require("./uploads.route");
const categoryRouter = require("./bookRouter/category.route");
const tagsRouter = require("./bookRouter/tag.route");
const authorRouter = require("./bookRouter/author.route");
const publisherRouter = require("./bookRouter/publisher.route");
const supplierRouter = require("./bookRouter/supplier.route");
const uploadRouter = require("./uploads.route");
const bookRouter = require("./bookRouter/book.route");

function route(app) {
  app.use("/tag", tagsRouter);
  app.use("/category", categoryRouter);
  app.use("/author", authorRouter);
  app.use("/publisher", publisherRouter);
  app.use("/supplier", supplierRouter);
  app.use("/book", bookRouter);
  //   app.use("/post", postRouter);
  //   app.use("/admin", adminRouter);
  //   app.use("/contact", contactRouter);
  app.use("/file-upload", uploadRouter);
}

module.exports = route;
