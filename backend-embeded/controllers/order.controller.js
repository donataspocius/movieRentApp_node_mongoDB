const User = require("./../models/user.model.js");

const orderMovie = async (req, res) => {
  const userId = req.params.id; // which rents a movie
  const order = {
    ...req.body,
    return_days: 30,
  };

  try {
    // Updating user which rents a movie order status
    const tenant = await User.findById(userId);
    const currentOrders = tenant.orders;

    await User.findByIdAndUpdate(userId, {
      orders: [...currentOrders, order],
    });

    // Updating user who's movie is rented movie status
    const movieOwner = await User.findById(order.movieOwnerId);

    const updatedOwnewMovies = movieOwner.movies.map((movie) => {
      if (movie.movie_name === order.movie_name) {
        movie.is_available = false;
      }

      return movie;
    });

    await User.findByIdAndUpdate(order.movieOwnerId, {
      movies: updatedOwnewMovies,
    });

    res.json({ message: "Movie rented" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { orderMovie };
