const Movie = require("./../models/movie.model.js");
const Order = require("./../models/order.model.js");

const createOrder = async (req, res) => {
  const userId = req.params.id;
  const orderData = req.body;

  try {
    const movie = await Movie.findOne({
      user_id: orderData.movieOwnerId,
      movie_name: orderData.movie_name,
    });

    await Movie.findByIdAndUpdate(movie._id, { is_available: false });

    const newOrder = {
      movie_id: movie._id,
      user_id: userId,
      return_days: 30,
    };

    const order = new Order(newOrder);

    await order.save();

    res.json({ message: "Movie rented" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder };
