const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk memungkinkan parsing body dari request
app.use(express.json());

// Data contoh untuk digunakan
let data = [
  { id: 1, hostName: 'Host 1', accountStatus: 'Active', berlianBulanIni: 100, durasiLiveBulanIni: 10, hariBerlakuBulanIni: 30, targetBerlianDasar: 500 },
  { id: 2, hostName: 'Host 2', accountStatus: 'Inactive', berlianBulanIni: 50, durasiLiveBulanIni: 5, hariBerlakuBulanIni: 20, targetBerlianDasar: 300 },
];

// Mengambil semua data
app.get('/data', (req, res) => {
  res.json(data);
});

// Mengambil data berdasarkan ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(item => item.id === id);
  if (!item) {
    res.status(404).json({ message: 'Data not found' });
  } else {
    res.json(item);
  }
});

// Menyimpan data baru
app.post('/data', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Mengedit data berdasarkan ID
app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Data not found' });
  } else {
    data[index] = { ...req.body, id };
    res.json(data[index]);
  }
});

// Menghapus data berdasarkan ID
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Data not found' });
  } else {
    data.splice(index, 1);
    res.json({ message: 'Data deleted successfully' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
