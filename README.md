# final-project-MIS-707
Gestor de Contraseñas Seguro
Descripción general

Este proyecto es un Gestor de Contraseñas desarrollado en Node.js, diseñado para almacenar, administrar y proteger contraseñas de manera segura.
La aplicación utiliza cifrado simétrico AES-256-CBC para guardar las contraseñas en una base de datos SQLite de forma cifrada.
Está pensada como una aplicación de consola simple, permitiendo crear, listar (descifradas), eliminar y visualizar las contraseñas cifradas.

Tecnologías y librerías
Lenguaje: Node.js (JavaScript)

Librerías:
sqlite3: Para la base de datos local.
readline-sync: Para la interacción en consola.
crypto: Módulo nativo de Node.js para cifrado simétrico AES-256-CBC.

Instalación y ejecución:
1. Clonar el repositorio.
2. Instalar dependencias con npm install.
3. Ejecutar la aplicación con:
      node index.js

