const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'552510',
    database:'livraria'
})

app.get('/livros/:id', (req, res) => {
    const id = req.params.id

    const queryLivro = 'SELECT * FROM livros WHERE id = ?'
    const queryImagens = 'SELECT url FROM imagens WHERE livro_id = ?'

    db.query(queryImagens, [id], (err, resultadoLivro) => {
        if(err) return res.status(500).json(err)

        if (resultadoLivro.length === 0) {
            return res.status(404).json({ erro: 'Livro não encontrado' })
        }

        db.query(queryImagens, [id], (err, resultadoImagens) => {
            if (err) return res.status(500).json(err)

            const livro = resultadoLivro[0]
            livro.imagens = resultadoImagens.map(img => img.url)

            res.json(livro)
        })
    })
})

app.listen(3000, () =>{
    console.log('Servidor rodando em https://localhost:3000')
})