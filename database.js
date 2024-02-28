import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

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