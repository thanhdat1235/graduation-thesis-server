const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
// const { authAdminRole, authManagerRole } = require("../middleware/authenRoles");

const publisherController = require("../../app/controllers/PublisherController");

/**
 * @swagger
 * '/category':
 *  get:
 *     tags: [POST]
 *     summary: Create category.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/Category'
 */

router.get("/", publisherController.findAll);

/**
 * @swagger
 * '/category/create':
 *  post:
 *     tags: [BOOK]
 *     summary: Create category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/Category'
 */

router.post(
  "/create",
  //   auth,
  //   authManagerRole,
  publisherController.createPublisher
);

// router.get("/get-all-categories", publisherController.findAll);

module.exports = router;
