const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const movie = await service.read(request.params.movie_id);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function listTheatersByMovie(request, response, next) {
  const { movie_id } = request.params;
  const data = await service.listTheatersByMovie(movie_id);
  response.json({ data });
}

async function listReviewsByMovie(request, response, next) {
  const { movie_id } = request.params
  const reviews = await service.listReviewsByMovie(movie_id);

  const data = reviews.map((review) => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    created_at: review.created_at,
    updated_at: review.updated_at,
    critic_id: review.critic_id,
    movie_id: review.movie_id,
    critic: {
      critic_id: review.critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
      created_at: review.critic_created_at,
      updated_at: review.critic_updated_at,
    },
  }));

  response.json({ data })
}

async function read(request, response) {
  const { movie: data } = response.locals;
  response.json({ data });
}

async function list(request, response) {
  const { is_showing } = request.query;
  const data = await service.list(is_showing);
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersByMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersByMovie)],
  listReviewsByMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsByMovie)],
};
