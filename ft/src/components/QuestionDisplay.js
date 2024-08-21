import React, { useState } from 'react';
import '../styles/Display.css';

function QuestionDisplay({ questions, onDeleteQuestion, onEditQuestion }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [editOptions, setEditOptions] = useState([]);

  const startEditing = (index, question) => {
    setIsEditing(index);
    setEditText(question.question);
    setEditOptions(question.options.map(opt => opt.text));
  };

  const handleEditChange = (index, value) => {
    const newOptions = [...editOptions];
    newOptions[index] = value;
    setEditOptions(newOptions);
  };

  const saveEdit = (index) => {
    const updatedQuestion = {
      question: editText,
      options: editOptions.map((opt, i) => ({
        text: opt,
        isCorrect: questions[index].options[i].isCorrect,
      })),
    };
    onEditQuestion(index, updatedQuestion);
    setIsEditing(null);
  };

  return (
    <div className="question-display">
      <h2>Generated Questions</h2>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} className="question-item">
            {isEditing === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                {editOptions.map((opt, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleEditChange(i, e.target.value)}
                    />
                  </div>
                ))}
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>Q:</strong> {q.question}</p>
                <ul>
                  {q.options.map((opt, idx) => (
                    <li key={idx} className={opt.isCorrect ? 'correct' : ''}>
                      {opt.text}
                    </li>
                  ))}
                </ul>
                <button onClick={() => startEditing(index, q)}>Edit</button>
                <button onClick={() => onDeleteQuestion(index)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
}

export default QuestionDisplay;
