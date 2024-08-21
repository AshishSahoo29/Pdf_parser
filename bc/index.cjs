const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to pdf parsing
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const data = await pdfParse(req.file.buffer);
        const questions = parsePDF(data.text);
        res.json({ questions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to parse PDF' });
    }
});

// function to parse PDF 
function parsePDF(text) {
    // const questions = text.split('\n\n').map(block => {
    //     const lines = block.split('\n');
    //     const question = lines[0];
    //     const options = lines.slice(1, -1);
    //     const correctAnswer = lines[lines.length - 1].replace('Correct Answer: ', '');
    //     return { question, options, correctAnswer };
    // });
    // return questions;
    const lines = text.split('\n');
    const questions = [];
    let currentQuestion = null;

    lines.forEach(line => {
        // Trim the line to remove any leading or trailing spaces
        line = line.trim();

        // Check if the line is a question
        if (line.match(/^Q\d+\./)) {
            // Save the current question before starting a new one
            if (currentQuestion) {
                questions.push(currentQuestion);
            }
            currentQuestion = { question: line, options: [] };
        }
        // Check if the line is an option
        else if (line.match(/^[a-d]\./i)) {
            if (currentQuestion) {
                currentQuestion.options.push({ text: line, isCorrect: false });
            }
        }
        // Check for lines that might be part of the question or an option (multi-line support)
        else if (currentQuestion && currentQuestion.options.length === 0) {
            // Append to question if options haven't started yet
            currentQuestion.question += ` ${line}`;
        }
        else if (currentQuestion && currentQuestion.options.length > 0) {
            // Append to the last option
            const lastOption = currentQuestion.options[currentQuestion.options.length - 1];
            lastOption.text += ` ${line}`;
        }
    });

    // Don't forget to push the last question after loop ends
    if (currentQuestion) {
        questions.push(currentQuestion);
    }

    return questions;
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
