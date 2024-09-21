const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movie_id").get(controller.read).all(methodNotAllowed);
router.route("/:movie_id/theaters").get(controller.listTheatersByMovie).all(methodNotAllowed);
router.route("/:movie_id/reviews").get(controller.listReviewsByMovie).all(methodNotAllowed);

const reviewsRouter = require("../reviews/reviews.router");



const theatersRouter = require("../theaters/theaters.router");

module.exports = router;
