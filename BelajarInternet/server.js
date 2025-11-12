const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Remove query string and get clean path
    let filePath = req.url.split('?')[0];
    
    // Default to index.html for root path
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    const fullPath = path.join(__dirname, filePath);
    const extname = path.extname(fullPath);
    const contentType = mimeTypes[extname] || 'text/plain';
    
    // Security check - prevent directory traversal
    if (!fullPath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
            return;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Website "Cara Kerja Internet" is ready!');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying port ${port + 1}`);
        server.listen(port + 1);
    } else {
        console.error('Server error:', err);
    }
});