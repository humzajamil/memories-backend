import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));

//the extended: true precises that the req. body object will contain values of any type instead of just strings
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// /posts indicates that every route inside postRoutes is going to start with it.
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to memories backend");
});

//process.env.PORT = will be populated by the host
const PORT = process.env.PORT || "5000";

//useNew and useUni are for avoiding warnings and errors
mongoose
  .connect(
    "mongodb+srv://humzajameel:Error500@cluster0.kndno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`application connected to database at port ${PORT}`)
    )
  )
  .catch((error) => console.log(`error connecting to database ${error}`));
//for avoiding warnings and errors
mongoose.set("useFindAndModify", false);
