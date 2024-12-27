import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
