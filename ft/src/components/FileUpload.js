import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FileUpload.css';

function FileUpload({ onQuestionsParsed }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      onQuestionsParsed(response.data.questions);
    } catch (err) {
      console.error('Error uploading file', err);
    }
  };

  return (
    <div className="file-upload card">
      <h2>Upload PDF</h2>
      <input type="file" onChange={handleFileChange} accept="application/pdf"/>
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}

export default FileUpload;
