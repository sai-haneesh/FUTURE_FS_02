const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'leads.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readLeads() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}
function saveLeads(leads) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
}
app.get('/api/leads', (req, res) => res.json(readLeads()));
app.post('/api/leads', (req, res) => {
  const { name, email, source = 'Website', status = 'New', notes = '' } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });
  const leads = readLeads();
  const lead = { id: Date.now().toString(), name: String(name).trim(), email: String(email).trim(),
    source: String(source).trim(), status: ['New','Contacted','Converted'].includes(status) ? status : 'New',
    notes: String(notes).trim(), createdAt: new Date().toISOString() };
  leads.unshift(lead); saveLeads(leads); res.status(201).json(lead);
});
app.patch('/api/leads/:id', (req, res) => {
  const leads = readLeads(); const i = leads.findIndex(x => x.id === req.params.id);
  if (i < 0) return res.status(404).json({ error: 'Lead not found.' });
  const { status, notes } = req.body;
  if (status !== undefined) {
    if (!['New','Contacted','Converted'].includes(status)) return res.status(400).json({ error: 'Invalid status.' });
    leads[i].status = status;
  }
  if (notes !== undefined) leads[i].notes = String(notes).trim();
  saveLeads(leads); res.json(leads[i]);
});
app.delete('/api/leads/:id', (req, res) => {
  const leads = readLeads(); const next = leads.filter(x => x.id !== req.params.id);
  if (next.length === leads.length) return res.status(404).json({ error: 'Lead not found.' });
  saveLeads(next); res.status(204).end();
});
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`CRM running at http://localhost:${PORT}`));
