import { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div>
            <h2>Upload Excel File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
