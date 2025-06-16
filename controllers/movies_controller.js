// # IMPORT
//--- IMPORT DB
import connection from "../db/movies_db.js";

// # GLOBAL DATA
const urlImage = "http://localhost:3000/images/";

// # FUNCTION
//--- IMAGE URL FUNCTION
function setImageUrl(data) {
  data.map((movie) => {
    return (movie.image = `${urlImage}${movie.image}`);
  });
}

// # CONTROLLERS
//--- INDEX FUNCTION
function index(req, res) {
  const sqlIndex = `SELECT * FROM movies`;

  connection.query(sqlIndex, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    const data = results;
    setImageUrl(data);

    res.json(data);
  });
}

// # EXPORT
export default { index };
