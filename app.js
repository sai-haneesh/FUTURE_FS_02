const rows = document.querySelector('#leadRows');
const form = document.querySelector('#leadForm');
let leads = [];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function request(url, options={}) {
  const response = await fetch(url, { headers: {'Content-Type':'application/json'}, ...options });
  if (!response.ok) { const err = await response.json().catch(()=>({error:'Request failed'})); throw new Error(err.error || 'Request failed'); }
  return response.status === 204 ? null : response.json();
}
function render() {
  const q = document.querySelector('#search').value.toLowerCase().trim();
  const filter = document.querySelector('#statusFilter').value;
  const filtered = leads.filter(l => (!filter || l.status === filter) && `${l.name} ${l.email}`.toLowerCase().includes(q));
  document.querySelector('#totalCount').textContent = leads.length;
  document.querySelector('#newCount').textContent = leads.filter(l=>l.status==='New').length;
  document.querySelector('#contactedCount').textContent = leads.filter(l=>l.status==='Contacted').length;
  document.querySelector('#convertedCount').textContent = leads.filter(l=>l.status==='Converted').length;
  document.querySelector('#resultCount').textContent = `${filtered.length} lead${filtered.length===1?'':'s'}`;
  document.querySelector('#empty').classList.toggle('hidden', filtered.length !== 0);
  rows.innerHTML = filtered.map(l => `<tr>
    <td><b>${escapeHTML(l.name)}</b><small>${escapeHTML(l.email)}</small></td>
    <td>${escapeHTML(l.source)}</td>
    <td><span class="status ${escapeHTML(l.status)}">${escapeHTML(l.status)}</span></td>
    <td>${escapeHTML(l.notes || '—')}</td>
    <td><div class="row-actions"><select aria-label="Update status for ${escapeHTML(l.name)}" data-status="${escapeHTML(l.id)}"><option ${l.status==='New'?'selected':''}>New</option><option ${l.status==='Contacted'?'selected':''}>Contacted</option><option ${l.status==='Converted'?'selected':''}>Converted</option></select><button class="delete" data-delete="${escapeHTML(l.id)}" aria-label="Delete ${escapeHTML(l.name)}">×</button></div></td>
  </tr>`).join('');
}
async function load() { try { leads = await request('/api/leads'); render(); } catch(e) { document.querySelector('#notice').textContent = `Could not load leads: ${e.message}. Start the server with npm start.`; } }
document.querySelector('#showForm').addEventListener('click', () => { form.classList.toggle('hidden'); if (!form.classList.contains('hidden')) form.querySelector('input').focus(); });
document.querySelector('#cancelForm').addEventListener('click', () => { form.reset(); form.classList.add('hidden'); });
form.addEventListener('submit', async e => {
  e.preventDefault(); const data = Object.fromEntries(new FormData(form).entries());
  try { await request('/api/leads', {method:'POST', body:JSON.stringify(data)}); form.reset(); form.classList.add('hidden'); document.querySelector('#notice').textContent='Lead added successfully.'; await load(); }
  catch(err) { document.querySelector('#notice').textContent=err.message; }
});
rows.addEventListener('change', async e => {
  if (!e.target.matches('[data-status]')) return;
  try { await request(`/api/leads/${encodeURIComponent(e.target.dataset.status)}`, {method:'PATCH',body:JSON.stringify({status:e.target.value})}); document.querySelector('#notice').textContent='Lead status updated.'; await load(); }
  catch(err) { document.querySelector('#notice').textContent=err.message; }
});
rows.addEventListener('click', async e => {
  const button = e.target.closest('[data-delete]'); if (!button) return;
  if (!confirm('Delete this lead?')) return;
  try { await request(`/api/leads/${encodeURIComponent(button.dataset.delete)}`, {method:'DELETE'}); document.querySelector('#notice').textContent='Lead deleted.'; await load(); }
  catch(err) { document.querySelector('#notice').textContent=err.message; }
});
document.querySelector('#search').addEventListener('input', render);
document.querySelector('#statusFilter').addEventListener('change', render);
load();
