const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://leahdesar:YIQsgaVrZBJhGUIL@cluster0.cnco2vy.mongodb.net/crudSocket"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};
