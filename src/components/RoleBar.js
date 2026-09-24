import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

// Job titles the user searches for. Clicking a chip makes it the active
// search term for every platform link; the list persists in localStorage.
export default function RoleBar({ t, roles, selectedRole, onSelect, onAdd, onRemove }) {
  const [draft, setDraft] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const role = draft.trim().replace(/\s+/g, ' ');
    if (!role) return;
    onAdd(role);
    setDraft('');
  };

  return (
    <div style={{ display:'flex', gap:'6px', padding:'4px 6px', background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'12px', alignItems:'center', flexWrap:'wrap' }}>
      {roles.map(r => {
        const active = r === selectedRole;
        return (
          <span key={r} style={{ display:'inline-flex', alignItems:'center', borderRadius:'8px', background:active?t.accent:'transparent' }}>
            <button onClick={()=>onSelect(r)} style={{ padding:'6px 4px 6px 10px', border:'none', background:'transparent', color:active?'#fff':t.textSecondary, fontSize:'12px', fontWeight:'500', cursor:'pointer' }}>{r}</button>
            <button onClick={()=>onRemove(r)} aria-label={`Remove ${r}`} style={{ padding:'6px 8px 6px 2px', border:'none', background:'transparent', color:active?'#fff':t.textTertiary, cursor:'pointer', display:'flex' }}><X size={12}/></button>
          </span>
        );
      })}
      <form onSubmit={submit} style={{ display:'flex', alignItems:'center' }}>
        <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Add job title…" aria-label="Add job title"
          style={{ width:'130px', padding:'6px 8px', border:'none', background:'transparent', color:t.text, fontSize:'12px', outline:'none' }}/>
        <button type="submit" aria-label="Add role" style={{ border:'none', background:'transparent', color:t.accent, cursor:'pointer', display:'flex', padding:'4px' }}><Plus size={14}/></button>
      </form>
    </div>
  );
}
