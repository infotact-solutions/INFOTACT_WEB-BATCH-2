const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const xlsx = require('xlsx');
const Data = require('../models/Data');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const filePath = path.join(process.cwd(), req.file.path);
        console.log('File path:', filePath);
        console.log('File exists:', fs.existsSync(filePath));

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (sheetData.length === 0) {
            return res.status(400).json({ message: "Excel file is empty" });
        }

        const formattedData = sheetData.map(record => ({
            name: record.Name || record.name || '',
            email: record.Email || record.email || '',
            phone: record.Phone || record.phone || ''
        }));

        const result = await Data.insertMany(formattedData);

        res.status(200).json({ 
            message: "File uploaded and data stored in MongoDB successfully",
            filename: req.file.filename,
            recordsInserted: result.length,
            data: formattedData.slice(0, 5) 
        });

    } catch (err) {
        console.error("Error processing file:", err);
        res.status(500).json({ 
            message: "Error processing Excel file", 
            error: err.message
        });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newData = new Data({ name, email, phone });
        await newData.save();
        
        res.json({ message: 'Data added successfully!' });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: 'Error saving data' });
    }
});

module.exports = router;
