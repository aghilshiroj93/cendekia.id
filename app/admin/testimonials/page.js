'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Quote, AlertTriangle } from 'lucide-react';
import { getTestimonials, saveTestimonials } from '@/lib/storage';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', content: '' });

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, role: item.role, content: item.content });
    } else {
      setEditingItem(null);
      setFormData({ name: '', role: '', content: '' });
    }
    setIsModalOpen(true);
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    const idToDelete = String(itemToDelete.id);
    setTestimonials(current => {
      const updated = current.filter(t => String(t.id) !== idToDelete);
      saveTestimonials(updated);
      return updated;
    });
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTestimonials(current => {
      let updated;
      if (editingItem) {
        updated = current.map(t => String(t.id) === String(editingItem.id) ? { ...t, ...formData } : t);
      } else {
        updated = [...current, { id: String(Date.now()), ...formData }];
      }
      saveTestimonials(updated);
      return updated;
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h1>Kelola Testimoni</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ gap: 'var(--space-xs)' }}>
          <Plus size={18} /> Tambah Testimoni
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
        {testimonials.map((t) => (
          <div key={t.id} className="card" style={{ position: 'relative' }}>
            <Quote size={30} color="var(--primary)" style={{ opacity: 0.2, position: 'absolute', top: '20px', left: '20px' }} />
            <div style={{ paddingTop: '20px' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--secondary)' }}>"{t.content}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{t.name}</h4>
                  <small style={{ color: 'var(--primary)' }}>{t.role}</small>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleOpenModal(t)} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={18} /></button>
                  <button onClick={() => confirmDelete(t)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--secondary)' }}>Belum ada testimoni.</div>}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2>{editingItem ? 'Edit Testimoni' : 'Tambah Testimoni'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nama Klien</label>
                <input 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Pekerjaan/Role (Contoh: Mahasiswa Unpad)</label>
                <input 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Isi Testimoni</label>
                <textarea 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', minHeight: '100px' }}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Simpan Testimoni</button>
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
            <h3>Hapus Testimoni?</h3>
            <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Hapus ulasan dari <strong>{itemToDelete?.name}</strong>?</p>
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
