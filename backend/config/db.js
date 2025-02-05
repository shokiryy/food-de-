import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://shokirjon7:33858627@cluster0.dywxc.mongodb.net/food-del')
    .then(() => console.log("db connected"))
    .catch((err) => console.error("DB connection error:", err));
};
