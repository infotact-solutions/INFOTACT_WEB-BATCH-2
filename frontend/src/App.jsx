import React from 'react';
import DataEntryForm from './components/DataEntryForm';
import FileUpload from './components/FileUploads';

const App = () => {
    return (
        <div>
            <h1>Data Entry and File Upload</h1>
            <DataEntryForm />
            <FileUpload />
        </div>
    );
};

export default App;