// db.js
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movies_db",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Errore di connessione:", err);
    return;
  }
  console.log("✅ Connesso a MySQL");
});

export default connection;
