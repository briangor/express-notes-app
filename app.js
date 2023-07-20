import express from 'express'

// import db function 
import { getNote, getNotes, createNote, deleteNote } from './database.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("server is up!")
})

app.get('/notes', async (req, res) => {
    //res.send("this should be the notes")
    const notes = await getNotes()
    res.send(notes)
})

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post('/notes', async (req, res) => {
    const { title, contents } = req.body // express grabs data from http
    const note = await createNote(title, contents)
    res.status(201).send(note)
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id
    const del_note = await deleteNote(id)
    res.send(del_note)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})