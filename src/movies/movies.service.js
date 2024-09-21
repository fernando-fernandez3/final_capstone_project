const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing == 'true') {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  return db("movies").select("*").where({ movie_id }).first();
}


async function listTheatersByMovie(movie_id) {
  return db("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*")
    .where({ "movies_theaters.movie_id": movie_id, "movies_theaters.is_showing": true });
}

async function listReviewsByMovie(movie_id) {
  return db("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select(
      "reviews.*",
      "critics.critic_id as critic_id",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name",
      "critics.created_at as critic_created_at",
      "critics.updated_at as critic_updated_at"
    )
    .where({ "reviews.movie_id": movie_id });
}

module.exports = {
  list,
  read,
  listTheatersByMovie,
  listReviewsByMovie
};
