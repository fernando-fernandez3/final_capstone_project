const db = require("../db/connection");

const tableName = "reviews";

async function destroy(review_id) {
  return db(tableName).where({ review_id }).del();  
}

async function list(movie_id) {
  return db(tableName).select("*").where({ movie_id })
}

async function read(review_id) {
  return db(tableName).select("*").where({ review_id }).first();  
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
