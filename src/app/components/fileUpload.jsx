import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/uploadSyllabus', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
