// # IMPORT
//--- IMPORT DB
import connection from "../db/movies_db.js";

// # GLOBAL DATA
const urlImage = "http://localhost:3000/images/";

// # FUNCTION
//--- IMAGE URL FUNCTION
function setImageUrl(data) {
  // Se data è un ARRAY
  if (Array.isArray(data)) {
    data.forEach((movie) => {
      movie.image = movie.image ? `${urlImage}${movie.image}` : null;
    });
    // Se data esiste ed è un OGGETTO
  } else if (data && typeof data === "object") {
    data.image = data.image ? `${urlImage}${data.image}` : null;
    // Se non esiste o non è valido
  } else {
    console.warn("setImageUrl ha ricevuto un valore non valido:", data);
  }
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

//--- SHOW FUNCTION

function show(req, res) {
  let movie = {};
  const { id } = req.params;

  const sqlMovieId = `SELECT * 
                    FROM movies
                    WHERE movies.id = ?;  `;

  const sqlMovieIdReview = `SELECT * 
                    FROM reviews
                    WHERE movie_id = ?;  `;

  connection.query(sqlMovieId, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Film non trovato" });
    }
    // Il singolo film
    movie = results[0];
    setImageUrl(movie);

    connection.query(sqlMovieIdReview, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });

      const reviewsMovie = reviewResults.map((review) => ({
        id: review.id,
        name: review.name,
        vote: review.vote,
        text: review.text,
      }));

      movie = { ...movie, reviews: reviewsMovie };

      res.json(movie);
    });
  });
}

// # EXPORT
export default { index, show };
