const User = require("./../models/user.model.js");
const Movie = require("./../models/movie.model.js");
const Order = require("./../models/order.model.js");

const userSignup = async (req, res) => {
  const newUserData = req.body;
  try {
    const isUserExist = await User.findOne({ email: newUserData.email });

    if (!isUserExist) {
      const newUser = new User(newUserData);

      const createdUser = await newUser.save();

      res.json({
        message: "User created",
        user: createdUser,
      });
    } else {
      res.json({ message: "User with given email already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne(userData);

    if (user) {
      res.json({ message: "User founded", user });
    } else {
      res.json({ message: "User with given email and password not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    const allMovies = await Movie.find({});
    const userMovies = allMovies
      .filter((movie) => movie.user_id.toString() === userId)
      .map((movie) => ({
        ...movie.toObject(),
        userId: movie.user_id.toString(),
      }));

    const orders = await Order.find({ user_id: userId });

    const ordersWithMoviesData = [...orders].reduce((total, order) => {
      let newOrder;

      allMovies.forEach((movie) => {
        if (order.movie_id.toString() === movie._id.toString()) {
          newOrder = {
            movieOwnerId: movie._id.toString(),
            movie_name: movie.movie_name,
            movie_category: movie.movie_category,
            movie_rent_price: movie.movie_rent_price,
            return_days: order.return_days,
          };
        }
      });

      total.push(newOrder);

      return total;
    }, []);

    res.json({
      ...user.toObject(),
      movies: userMovies,
      orders: ordersWithMoviesData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserInfo, userLogin, userSignup };
