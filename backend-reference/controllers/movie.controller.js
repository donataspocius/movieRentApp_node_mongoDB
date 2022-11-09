const Movie = require("./../models/movie.model.js");

const createMovie = async (req, res) => {
  const { userId, movie_name, movie_category, movie_rent_price, is_available } =
    req.body;

  const newMovie = {
    user_id: userId,
    movie_name,
    movie_category,
    movie_rent_price,
    is_available,
  };

  try {
    const movie = new Movie(newMovie);

    await movie.save();

    res.json({ message: "Movie added" });
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});

    const availableMovies = [...movies]
      .map((movie) => {
        const normalizedMovie = movie.toObject();

        normalizedMovie.userId = normalizedMovie.user_id.toString();
        delete normalizedMovie.user_id;

        return normalizedMovie;
      })
      .filter((movie) => movie.is_available);

    res.json(availableMovies);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createMovie, getMovies };
