import React, { useState, useRef } from 'react';

export default function Apply() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gpa, setGpa] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gpa', gpa);
    if (idFile) formData.append('idFile', idFile);

    const res = await fetch('http://localhost:4000/apply', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setMessage('Submission failed.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p>Your application has been submitted successfully.</p>
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4" encType="multipart/form-data">
      <h1 className="text-3xl font-bold pt-10 pb-5 text-blue-950">Global Academy Application</h1>
      {message && <p className="text-green-600">{message}</p>}
      <h1 className="pb-0"> Full Name: </h1>
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Your answer"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <h1 className="pb-0"> Email: </h1>
      <input
        className="w-full p-2 border rounded"
        type="email"
        placeholder="Your answer"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <h1 className="pb-0"> GPA: </h1>

      <input
        className="w-full p-2 border rounded"
        type="number"
        step="0.01"
        min="0"
        max="4"
        placeholder="Your answer"
        value={gpa}
        onChange={e => setGpa(e.target.value)}
        required
      />

      <h1 className="pb-0"> Passport: </h1>

      {/* Upload file button and display box inline */}
      <div className="flex items-center space-x-4">
        {/* Hidden file input */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          ref={fileInputRef}
          onChange={e => setIdFile(e.target.files[0])}
          className="hidden"
          required
        />
        {/* Box to show uploaded file name */}
        <div className="flex-1 p-2 border rounded truncate text-gray-500 border-black" title={idFile ? idFile.name : ''}>
          {idFile ? idFile.name : 'No file chosen'}
          
        </div>

        {/* Styled button to trigger file input */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Upload Passport
        </button>

      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        type="submit"
      >
        Submit Application
      </button>
    </form>
  );
}
