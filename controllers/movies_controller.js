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
  // Lista dei film
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

  const sqlAverage = `SELECT AVG(vote) AS average_vote FROM reviews WHERE movie_id = ?`;

  connection.query(sqlMovieId, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Film non trovato" });
    }

    // Il singolo film
    movie = results[0];
    console.log(movie);
    setImageUrl(movie);

    connection.query(sqlMovieIdReview, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });

      //   Prendo alcune voci da reviewsResults
      const reviewsMovie = reviewResults.map((review) => ({
        id: review.id,
        name: review.name,
        vote: review.vote,
        text: review.text,
      }));

      //   Unisco le Reviews agli altri dati di movie
      movie = { ...movie, reviews: reviewsMovie };

      // Ora calcolo la media
      connection.query(sqlAverage, [id], (err, avgResult) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Errore nella query della media voto" });

        const avg = avgResult[0].average_vote;
        movie = { ...movie, verage_vote: avg };

        res.json(movie);
      });
    });
  });
}

//--- STORE REVIEW
function storeReview(req, res) {
  const { id } = req.params;

  const { name, vote, text } = req.body;

  const sqlStoreReview = `INSERT INTO reviews 
                          (movie_id, name, text, vote)
                          VALUES (?, ?, ?, ?);`;

  connection.query(sqlStoreReview, [id, name, text, vote], (err, result) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.status(201).json({
      message: "Recensione salvata con successo",
      review_id: result.insertId,
    });
  });
}

// # EXPORT
export default { index, show, storeReview };
