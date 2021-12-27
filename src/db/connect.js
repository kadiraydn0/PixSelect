import mongoose from "mongoose";


function connect() {
  return mongoose
    .connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("Mongo Connect Error",error)
      process.exit(1);
    });
}

export default connect;
