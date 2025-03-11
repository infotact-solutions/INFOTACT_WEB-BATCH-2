import { useState } from 'react';

const DataEntryForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/data/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div>
            <h2>Manual Data Entry</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DataEntryForm;
