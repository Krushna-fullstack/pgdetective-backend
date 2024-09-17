import { app } from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(error);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
