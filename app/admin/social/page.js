'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, ExternalLink, AlertTriangle } from 'lucide-react';
import { getSocials, saveSocials } from '@/lib/storage';

export default function ManageSocial() {
  const [socials, setSocials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [socialToDelete, setSocialToDelete] = useState(null);
  const [editingSocial, setEditingSocial] = useState(null);
  const [formData, setFormData] = useState({ name: '', url: '', color: '#000000', platform: 'whatsapp' });

  useEffect(() => {
    setSocials(getSocials());
  }, []);

  const handleOpenModal = (social = null) => {
    if (social) {
      setEditingSocial(social);
      setFormData({ name: social.name, url: social.url, color: social.color, platform: social.platform });
    } else {
      setEditingSocial(null);
      setFormData({ name: '', url: '', color: '#000000', platform: 'whatsapp' });
    }
    setIsModalOpen(true);
  };

  const confirmDelete = (social) => {
    setSocialToDelete(social);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!socialToDelete) return;
    const idToDelete = String(socialToDelete.id);
    const updated = socials.filter(s => String(s.id) !== idToDelete);
    setSocials(updated);
    saveSocials(updated);
    setIsDeleteModalOpen(false);
    setSocialToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingSocial) {
      updated = socials.map(s => String(s.id) === String(editingSocial.id) ? { ...s, ...formData } : s);
    } else {
      updated = [...socials, { id: String(Date.now()), ...formData }];
    }
    setSocials(updated);
    saveSocials(updated);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h1>Kelola Media Sosial</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ gap: 'var(--space-xs)' }}>
          <Plus size={18} /> Tambah Link
        </button>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
        {socials.map((link) => (
          <div key={link.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: link.color }}>{link.name}</h3>
              <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', margin: 0 }}>{link.url}</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', padding: '8px' }}>
                <ExternalLink size={18} />
              </a>
              <button type="button" onClick={() => handleOpenModal(link)} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}><Edit2 size={18} /></button>
              <button type="button" onClick={() => confirmDelete(link)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2>{editingSocial ? 'Edit Link' : 'Tambah Link'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nama Platform (Contoh: Instagram)</label>
                <input 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>URL Link</label>
                <input 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://..."
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Warna Aksen</label>
                  <input 
                    type="color"
                    style={{ width: '100%', height: '42px', padding: '2px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tipe Ikon</label>
                  <select 
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: 'var(--space-xs)' }}>
                <Save size={18} /> Simpan Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
              <AlertTriangle size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3>Hapus Link?</h3>
            <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Hapus link <strong>{socialToDelete?.name}</strong>?</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsDeleteModalOpen(false)} className="btn" style={{ flex: 1, background: '#f1f5f9' }}>Batal</button>
              <button onClick={handleDelete} className="btn" style={{ flex: 1, background: '#ef4444', color: 'white' }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
