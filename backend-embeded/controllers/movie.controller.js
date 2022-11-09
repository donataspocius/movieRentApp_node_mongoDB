const User = require("./../models/user.model.js");

const getMovies = async (req, res) => {
  try {
    const users = await User.find();

    const availableMovies = users.reduce((total, item) => {
      item.movies.forEach((movie) => {
        if (movie.is_available) {
          total.push(movie);
        }
      });

      return total;
    }, []);

    res.json(availableMovies);
  } catch (error) {
    console.log(error);
  }
};

const createMovie = async (req, res) => {
  const movieData = req.body;
  const { userId } = movieData;

  try {
    const user = await User.findById(userId);
    const currentMovies = user.movies;

    await User.findByIdAndUpdate(userId, {
      movies: [...currentMovies, movieData],
    });

    res.json({ message: "Movie added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getMovies, createMovie };
