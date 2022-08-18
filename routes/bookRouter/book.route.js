const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
// const { authAdminRole, authManagerRole } = require("../middleware/authenRoles");

const bookController = require("../../app/controllers/BookController");

/**
 * @swagger
 * '/tags/create':
 *  post:
 *     tags: [POST]
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Create tags.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                categoryId:
 *                  type: string
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/Tags'
 */

router.post("/create", bookController.createBook);

router.get("/sale", bookController.saleBook);

router.get("/featured", bookController.featuredBook);

router.get("/similar/:id", bookController.similarBook);

router.delete("/:id", bookController.deleteBook);

router.put("/:id", bookController.updateBook);

router.get("/:id", bookController.findBookById);

router.get("/", bookController.findAll);

module.exports = router;
