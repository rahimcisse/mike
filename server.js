const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const dataFilePath = path.join(rootDir, 'programs.json');
const port = process.env.PORT || 3000;

const defaultPayload = {
  title: 'STAKEVISION PROGRAMS',
  pages: {
    acca: {
      title: "TODAY'S ACCA GAMES",
      cards: [
        {
          title: 'High Reward Games',
          icon: 'ph ph-soccer-ball',
          code: '78910',
          entries: [
            'Real Madrid vs Man City - Over 1.5',
            'Arsenal vs Bayern - Home Win',
            'Odds: 3.45'
          ]
        },
        {
          title: 'Safe Banker',
          icon: 'ph ph-chart-line-up',
          code: '123456',
          entries: [
            'PSG vs Barcelona - AWAY WIN',
            'Leverkusen vs West Ham - Home Win',
            'Odds: 2.10'
          ]
        }
      ]
    },
    draw: {
      title: "TODAY'S DRAW GAMES",
      cards: [
        {
          title: 'High Reward Games',
          icon: 'ph ph-soccer-ball',
          code: '78910',
          entries: [
            'Real Madrid vs Man City - 3 : 3',
            'Arsenal vs Bayern - 6 : 6',
            'Odds: 37.45'
          ]
        },
        {
          title: 'Safe Banker',
          icon: 'ph ph-chart-line-up',
          code: '123456',
          entries: [
            'PSG vs Barcelona - 9 : 9',
            'Leverkusen vs West Ham - 2 : 2',
            'Odds: 30.10'
          ]
        }
      ]
    },
    correct: {
      title: "TODAY'S CORRECT SCORE GAMES",
      cards: [
        {
          title: 'High Reward Games',
          icon: 'ph ph-soccer-ball',
          code: '78910',
          entries: [
            'Real Madrid vs Man City - Over 1.5',
            'Arsenal vs Bayern - Home Win',
            'Odds: 3.45'
          ]
        },
        {
          title: 'Safe Banker',
          icon: 'ph ph-chart-line-up',
          code: '123456',
          entries: [
            'PSG vs Barcelona - AWAY WIN',
            'Leverkusen vs West Ham - Home Win',
            'Odds: 2.10'
          ]
        }
      ]
    },
    elite: {
      title: "TODAY'S ELITE GAMES",
      cards: [
        {
          title: 'High Reward Games',
          icon: 'ph ph-soccer-ball',
          code: '78910',
          entries: [
            'Real Madrid vs Man City - Over 1.5',
            'Arsenal vs Bayern - Home Win',
            'Odds: 3.45'
          ]
        },
        {
          title: 'Safe Banker',
          icon: 'ph ph-chart-line-up',
          code: '123456',
          entries: [
            'PSG vs Barcelona - AWAY WIN',
            'Leverkusen vs West Ham - Home Win',
            'Odds: 2.10'
          ]
        }
      ]
    },
    golden: {
      title: "TODAY'S GOLDEN GAMES",
      cards: [
        {
          title: 'High Reward Games',
          icon: 'ph ph-soccer-ball',
          code: '78910',
          entries: [
            'Real Madrid vs Man City - Over 1.5',
            'Arsenal vs Bayern - Home Win',
            'Odds: 3.45'
          ]
        },
        {
          title: 'Safe Banker',
          icon: 'ph ph-chart-line-up',
          code: '123456',
          entries: [
            'PSG vs Barcelona - AWAY WIN',
            'Leverkusen vs West Ham - Home Win',
            'Odds: 2.10'
          ]
        }
      ]
    },
    nba: {
      title: "TODAY'S NBA GAMES",
      cards: [
        {
          title: 'High Reward Games',
          icon: 'ph ph-basketball',
          code: '78910',
          entries: [
            'Lakers vs Celtics - Over 220.5',
            'Knicks vs Bucks - Home Win',
            'Odds: 3.45'
          ]
        },
        {
          title: 'Safe Banker',
          icon: 'ph ph-chart-line-up',
          code: '123456',
          entries: [
            'Mavericks vs Suns - AWAY WIN',
            'Warriors vs Nuggets - Home Win',
            'Odds: 2.10'
          ]
        }
      ]
    }
  }
};

function ensureDataFile() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      console.log('Creating programs.json file...');
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultPayload, null, 2), 'utf8');
      console.log('programs.json created successfully at:', dataFilePath);
    } else {
      console.log('programs.json already exists at:', dataFilePath);
    }
  } catch (err) {
    console.error('Failed to ensure data file:', err);
    throw err;
  }
}

function normalizePayload(payload) {
  const base = payload && typeof payload === 'object' ? payload : defaultPayload;
  const pages = base.pages && typeof base.pages === 'object' ? base.pages : {};
  const normalizedPages = {};

  Object.keys(defaultPayload.pages).forEach((pageKey) => {
    const page = pages[pageKey] && typeof pages[pageKey] === 'object' ? pages[pageKey] : defaultPayload.pages[pageKey];
    normalizedPages[pageKey] = {
      title: page.title || defaultPayload.pages[pageKey].title,
      cards: Array.isArray(page.cards) ? page.cards : defaultPayload.pages[pageKey].cards
    };
  });

  return {
    title: base.title || 'STAKEVISION PROGRAMS',
    pages: normalizedPages
  };
}

function sendJson(res, statusCode, data) {
  try {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error('Error sending response:', err);
    try {
      res.end();
    } catch (e) {
      // Connection already closed
    }
  }
}

function serveStaticFile(req, res, pathname) {
  const safePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.join(rootDir, safePath);

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': mimeTypes[extension] || 'application/octet-stream' });
  res.end(content);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  // Allow simple CORS for API routes so the frontend can be opened from any origin
  if (url.pathname.startsWith('/api/')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (url.pathname === '/api/programs') {
    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    if (req.method === 'GET') {
      ensureDataFile();
      const raw = fs.readFileSync(dataFilePath, 'utf8');
      const parsed = JSON.parse(raw || '{}');
      const payload = normalizePayload(parsed);
      sendJson(res, 200, { ok: true, data: payload });
      return;
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      let body = '';
      const maxSize = 10 * 1024 * 1024; // 10MB limit

      req.on('data', (chunk) => {
        body += chunk.toString();
        if (body.length > maxSize) {
          req.connection.destroy();
        }
      });

      req.on('end', () => {
        try {
          if (!body || body.trim() === '') {
            sendJson(res, 400, { ok: false, error: 'Request body is empty' });
            return;
          }
          const parsed = JSON.parse(body);
          const normalizedPayload = normalizePayload(parsed);
          try {
            fs.writeFileSync(dataFilePath, JSON.stringify(normalizedPayload, null, 2), 'utf8');
            console.log('Successfully saved to programs.json');
            sendJson(res, 200, { ok: true, data: normalizedPayload });
          } catch (fsErr) {
            console.error('File write error:', fsErr);
            sendJson(res, 500, { ok: false, error: `Failed to write data file: ${fsErr.message}` });
          }
        } catch (error) {
          console.error('JSON parse error:', error);
          sendJson(res, 400, { ok: false, error: 'Invalid JSON payload: ' + error.message });
        }
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        sendJson(res, 500, { ok: false, error: 'Request error: ' + error.message });
      });
      return;
    }
  }

  serveStaticFile(req, res, url.pathname);
});

ensureDataFile();

server.listen(port, () => {
  console.log(`StakeVisionBet server running at http://localhost:${port}`);
});
