'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, AlertTriangle } from 'lucide-react';
import { getServices, saveServices } from '@/lib/storage';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'Globe' });

  useEffect(() => {
    setServices(getServices());
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ title: service.title, description: service.description, icon: service.icon });
    } else {
      setEditingService(null);
      setFormData({ title: '', description: '', icon: 'Globe' });
    }
    setIsModalOpen(true);
  };

  const confirmDelete = (service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!serviceToDelete) return;
    
    const idToDelete = String(serviceToDelete.id);
    const updated = services.filter(s => String(s.id) !== idToDelete);
    
    setServices(updated);
    saveServices(updated);
    
    setIsDeleteModalOpen(false);
    setServiceToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingService) {
      updated = services.map(s => String(s.id) === String(editingService.id) ? { ...s, ...formData } : s);
    } else {
      updated = [...services, { id: String(Date.now()), ...formData }];
    }
    setServices(updated);
    saveServices(updated);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h1>Kelola Layanan</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ gap: 'var(--space-xs)' }}>
          <Plus size={18} /> Tambah Layanan
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ padding: '1rem var(--space-lg)' }}>Nama Layanan</th>
              <th style={{ padding: '1rem var(--space-lg)' }}>Ikon</th>
              <th style={{ padding: '1rem var(--space-lg)', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem var(--space-lg)', fontWeight: '500' }}>{service.title}</td>
                <td style={{ padding: '1rem var(--space-lg)' }}>{service.icon}</td>
                <td style={{ padding: '1rem var(--space-lg)', textAlign: 'right' }}>
                  <button 
                    type="button"
                    onClick={() => handleOpenModal(service)} 
                    style={{ color: 'var(--primary)', marginRight: 'var(--space-md)', padding: '8px', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => confirmDelete(service)} 
                    style={{ color: '#ef4444', padding: '8px', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Form Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2>{editingService ? 'Edit Layanan' : 'Tambah Layanan'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Judul Layanan</label>
                <input 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Deskripsi</label>
                <textarea 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', minHeight: '100px' }}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Ikon (Lucide Name)</label>
                <select 
                   style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                   value={formData.icon}
                   onChange={(e) => setFormData({...formData, icon: e.target.value})}
                >
                  <option value="Globe">Globe</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="BarChart3">BarChart3</option>
                  <option value="FileText">FileText</option>
                  <option value="BookOpen">BookOpen</option>
                  <option value="Presentation">Presentation</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: 'var(--space-xs)' }}>
                <Save size={18} /> Simpan Perubahan
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
            <h3>Hapus Layanan?</h3>
            <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Anda akan menghapus <strong>{serviceToDelete?.title}</strong>. Tindakan ini tidak dapat dibatalkan.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="btn" 
                style={{ flex: 1, background: '#f1f5f9' }}
              >
                Batal
              </button>
              <button 
                onClick={handleDelete} 
                className="btn" 
                style={{ flex: 1, background: '#ef4444', color: 'white' }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
