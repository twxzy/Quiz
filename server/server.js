const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public'))); // Serve arquivos estáticos da pasta 'public'

// Serve o arquivo quiz.json a partir da pasta raiz
app.use('/server', express.static(path.join(__dirname))); // Serve a pasta atual (onde quiz.json está)

// Caminho para o arquivo JSON
const QUIZ_FILE = path.join(__dirname, 'quiz.json');

// Rota para salvar uma nova pergunta no JSON
app.post('/add-question', (req, res) => {
    const newQuestion = req.body;

    fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
        let quizData = {};

        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ error: 'Erro ao acessar o arquivo JSON' });
        }

        if (data) {
            try {
                quizData = JSON.parse(data);
            } catch (parseError) {
                console.error('Erro ao parsear o JSON:', parseError);
                return res.status(500).json({ error: 'Erro ao processar o arquivo JSON' });
            }
        }

        const questionId = `quiz-${Object.keys(quizData).length + 1}`;
        quizData[questionId] = newQuestion;

        fs.writeFile(QUIZ_FILE, JSON.stringify(quizData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Erro ao salvar o arquivo:', writeErr);
                return res.status(500).json({ error: 'Erro ao salvar a pergunta' });
            }
            res.json({ message: 'Pergunta adicionada com sucesso!', id: questionId });
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
