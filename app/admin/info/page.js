'use client';
import { useState, useEffect } from 'react';
import { Save, Info, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getInfo, saveInfo } from '@/lib/storage';

export default function ManageInfo() {
  const [info, setInfo] = useState({ address: '', phone: '', email: '', hours: '' });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setInfo(getInfo());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveInfo(info);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h1>Kelola Informasi Bisnis</h1>
        <p style={{ color: 'var(--secondary)' }}>Data ini akan ditampilkan secara otomatis di Footer website Anda.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', fontWeight: '600' }}>
                <MapPin size={18} color="var(--primary)" /> Alamat Lengkap
              </label>
              <textarea 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', minHeight: '80px' }}
                value={info.address}
                onChange={(e) => setInfo({...info, address: e.target.value})}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', fontWeight: '600' }}>
                  <Phone size={18} color="var(--primary)" /> No. WhatsApp (tanpa '+')
                </label>
                <input 
                  type="text"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={info.phone}
                  onChange={(e) => setInfo({...info, phone: e.target.value})}
                  placeholder="628123456789"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', fontWeight: '600' }}>
                  <Mail size={18} color="var(--primary)" /> Email Bisnis
                </label>
                <input 
                  type="email"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={info.email}
                  onChange={(e) => setInfo({...info, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', fontWeight: '600' }}>
                <Clock size={18} color="var(--primary)" /> Jam Operasional
              </label>
              <input 
                type="text"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                value={info.hours}
                onChange={(e) => setInfo({...info, hours: e.target.value})}
                placeholder="Senin - Sabtu: 09:00 - 18:00"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ gap: '10px', width: 'fit-content', marginTop: '1rem' }}>
              <Save size={20} /> {isSaved ? 'Berhasil Disimpan!' : 'Simpan Informasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
