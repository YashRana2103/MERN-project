import express from "express";
import Movie from "../models/Movie"; // Use `import` here

const router = express.Router();

// Route to get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the database
    res.json(movies); // Send movies as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any error that occurs
  }
});

// Route to add a new movie
router.post("/", async (req, res) => {
  const { title, genre, description, releaseDate, director, rating } = req.body;

  const newMovie = new Movie({
    title,
    genre,
    description,
    releaseDate,
    director,
    rating,
  });

  try {
    const movie = await newMovie.save(); // Save the new movie to the database
    res.status(201).json(movie); // Respond with the created movie data
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle error if validation fails
  }
});

export default router;
