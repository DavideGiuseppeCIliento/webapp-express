// # IMPORT
//--- IMPORT ROUTER
import movies_routes from "./routes/movies_routes.js";
//--- IMPORT EXPRESS
import express from "express";

// # GLOBAL DATA
const app = express();
const port = 3000;

// # MIDDLEWARE
app.use(express.static("public"));

// # CALL ROUTES
app.use("/movies", movies_routes);

app.listen(port, () => {
  console.log(`✅ Server in ascolto su http://localhost:${port}`);
});
