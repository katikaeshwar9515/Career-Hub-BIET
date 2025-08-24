import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://mittu8644:TLnkKkiSlirH3ZGD@cluster0.ilbcgkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "CBIT_CAREER_HUB_ASSIGNMENT",
      }
    )
    .then(() => {
      console.log(`Connected to database ${mongoose.connection.name}!!`);
    })
    .catch((err) => {
      console.log(`Some Error occured: ${err}`);
    });
};
