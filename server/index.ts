import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS ve JSON middleware'lerini ekle
app.use(cors());
app.use(express.json());

// Statik dosyaları sunma
const staticPath = path.resolve(__dirname, '../dist/public');
app.use(express.static(staticPath));

// API rotaları
app.get('/api/health', (req, res) => {
  res.json({ status: 'Sunucu çalışıyor', timestamp: new Date().toISOString() });
});

// Diğer API rotalarınızı buraya ekleyebilirsiniz
// Örnek:
// app.get('/api/users', (req, res) => { ... });

// Tüm diğer rotalar için React uygulamasını sun
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Sunucuyu oluştur
const PORT = process.env.PORT || 3000;
const server = createServer(app);

// Geliştirme ortamında sunucuyu başlat
if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
  });
}

export default server;
