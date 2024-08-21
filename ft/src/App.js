import React, { useState } from 'react';
import File from './components/FileUpload';
import QuestionDisplay from './components/QuestionDisplay';
import QuestionCreator from './components/QuestionCreator';
import './styles/App.css';

function App() {
  const [questions, setQuestions] = useState([]);

  const handleQuestionsParsed = (parsedQuestions) => {
    console.log('Parsed Questions:', parsedQuestions); 
    setQuestions(parsedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (index, updatedQuestion) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? updatedQuestion : q));
    setQuestions(updatedQuestions);
  };


  return (
    <div className="App">
      <h1>MCQ Generator</h1>
      <div className='card-container'>
        <File onQuestionsParsed={handleQuestionsParsed} />
        <QuestionCreator onQuestionsParsed={handleQuestionsParsed}/>
      </div>      
      <QuestionDisplay
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onEditQuestion={handleEditQuestion}
      />
    </div>
  );
}

export default App;
