// # IMPORT
//--- IMPORT EXPRESS
import express from "express";

//--- IMPORT ROUTER
import movies_routes from "./routes/movies_routes.js";

// --- IMPORT MIDDLEWARE
import errorHandler from "./middlewares/errorhandler.js";
import notFound from "./middlewares/notFound.js";
import cors from "cors";

// # GLOBAL DATA
const app = express();
const port = 3000;

app.use(cors());

// # SET PUBLIC DIRECTORY
app.use(express.static("public"));

// # CALL ROUTES
app.use("/movies", movies_routes);

// # MIDDLEWARE ERROR
app.use(errorHandler);

// # MIDDLEWARE NOT FOUND
app.use(notFound);

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Lettura della porta: ${port}`);
  }
});
