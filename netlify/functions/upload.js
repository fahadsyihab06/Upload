const express = require('express');
const multer = require('multer');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan nama unik
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const filePath = req.file.path.replace('/netlify/functions', '');

  res.json({
    message: 'File uploaded successfully',
    file: filePath,
    name: name,
    description: description
  });
});

module.exports.handler = serverless(app);
