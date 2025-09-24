const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "passwords.db");
const db = new sqlite3.Database(dbPath);

db.all("SELECT * FROM passwords", [], (err, rows) => {
    if (err) {
        console.error("Error leyendo la base de datos:", err.message);
    } else if (rows.length === 0) {
        console.log("No hay contraseñas guardadas.");
    } else {
        console.log("\n--- Contraseñas ENCRIPTADAS ---");
        rows.forEach((row) => {
            console.log(
                `ID: ${row.id}, Servicio: ${row.service}, Usuario: ${row.username}, Contraseña cifrada: ${row.password}`
            );
        });
    }
    db.close();
});
