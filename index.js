const readline = require("readline-sync");
const db = require("./db");
const { encrypt, decrypt } = require("./crypto");

// Menú principal
function menu() {
    console.clear();
    console.log("\n--- Gestor de Contraseñas ---");
    console.log("--- UCB -o- MIS-707 ---");
    console.log("1. Agregar nueva contraseña");
    console.log("2. Ver contraseñas almacenadas");
    console.log("3. Eliminar contrasena");
    console.log("4. Salir");

    const choice = readline.question("Selecciona una opcion: ");

    switch (choice) {
        case "1":
            addPassword();
            break;
        case "2":
            listPasswords();
            break;
        case "3":
            deletePassword();
            break;
        case "4":
            console.log("¡Hasta luego!");
            process.exit();
            break;
        default:
            console.log("Opción no válida");
            pauseReturnMenu();
    }
}

// Agregar nueva contraseña
function addPassword() {
    const service = readline.question("Servicio: ");
    const username = readline.question("Usuario: ");
    const password = readline.question("Contrasena: ", { hideEchoBack: true });
    const encrypted = encrypt(password);

    db.run(
        `INSERT INTO passwords(service, username, password) VALUES(?,?,?)`,
        [service, username, encrypted],
        (err) => {
            if (err) console.error(err.message);
            else console.log("Contraseña guardada con éxito.");
            pauseReturnMenu();
        }
    );
}

// Listar contraseñas almacenadas
function listPasswords() {
    db.all(`SELECT * FROM passwords`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else if (rows.length === 0) {
            console.log("No hay contraseñas guardadas.");
        } else {
            console.log("\n--- Lista de contraseñas ---");
            rows.forEach((row) => {
                console.log(
                    `ID: ${row.id}, Servicio: ${row.service}, Usuario: ${
                        row.username
                    }, Contraseña: ${decrypt(row.password)}`
                );
            });
        }
        pauseReturnMenu();
    });
}

// Eliminar contraseña por ID
function deletePassword() {
    const id = readline.question("ID de la contraseña a eliminar: ");
    db.run(`DELETE FROM passwords WHERE id = ?`, [id], (err) => {
        if (err) console.error(err.message);
        else console.log("Contraseña eliminada.");
        pauseReturnMenu();
    });
}

// Función para pausar antes de volver al menú
function pauseReturnMenu() {
    readline.question("\nPresiona Enter para volver al menu...");
    menu();
}

// Inicializar menú
menu();
