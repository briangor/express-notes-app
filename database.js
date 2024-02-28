import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10, 
}

const pool = mysql.createPool(dbConfig).promise()

// createConnection
/* const connection = mysql.createConnection(dbConfig)
connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.query('SELECT 1 + 2 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end() */

// createPool
// Simulating multiple queries simultaneously
/*
for (let i = 0; i < 5; i++) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      return;
    }

    console.log(`Connected to database using createPool - Connection ${i + 1}`);

    // Simulating a query
    connection.query('SELECT * FROM notes', (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);
      } else {
        console.log(`Query results (${i + 1}):`, results);
      }

      // Release the connection back to the pool when done
      connection.release();
    });
  });
}
*/


// Get all notes
export async function getNotes() {
    try {
        const [rows] = await pool.query("SELECT * FROM notes")
        return rows
    } catch (error) {
        console.log("error:", error.message);
        return { "error": error.message }
    }
}

export async function getNote(id) {
    try {
        const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id])
        return rows
    } catch (error) {
        console.log("error:", error.message);
        return { "error": error.message }
    }
} // test with where id = ${id} and access with no authorization/

export async function createNote(title, contents) {
    try {
        const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents])
        const id = result.insertId
        return getNote(id)
    } catch (error) {
        console.log("error:", error.message);
        return { "error": error.message }
    }
}

export async function updateNote(id) { }

export async function deleteNote(id) {
    try {
        const [rows] = await pool.query(`
    DELETE FROM notes
    WHERE id = ?
    `, [id])
        return rows
    } catch (error) {
        console.log("error:", error.message);
        return { "error": error.message }
    }
}

export async function deleteNotes() {
    try {
        const result = await pool.query(`
    DELETE FROM notes 
    `)
    } catch (error) {
        console.log("error:", error.message);
        return { "error": error.message }
    }
}