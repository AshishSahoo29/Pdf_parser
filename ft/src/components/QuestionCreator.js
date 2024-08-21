import React, { useState } from 'react';
import '../styles/QuestionCreator.css';

function QuestionCreator({ onQuestionsParsed }) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index) => {
    setCorrectOption(index);
  };

  const handleAddQuestion = () => {
    if (questionText.trim() && correctOption !== null) {
      const newQuestion = {
        question: questionText,
        options: options.map((opt, idx) => ({
          text: opt,
          isCorrect: idx === correctOption,
        })),
      };

      const newQuestions = [...questions, newQuestion];
      setQuestions(newQuestions);
      onQuestionsParsed(newQuestions);

      // Reset fields
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOption(null);
    }
  };

  return (
    <div className="question-creator card">
      <h2>Create Question</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={questionText}
        onChange={handleQuestionChange}
      />
      {options.map((option, index) => (
        <div key={index} className="option-input">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <input
            type="radio"
            name="correctOption"
            checked={correctOption === index}
            onChange={() => handleCorrectOptionChange(index)}
          />
          <label>Correct</label>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
}

export default QuestionCreator;
