'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Upload, AlertTriangle } from 'lucide-react';
import { getPortfolio, savePortfolio } from '@/lib/storage';

export default function ManagePortfolio() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'Website', description: '', image: '', link: '' });

  useEffect(() => {
    setProjects(getPortfolio());
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({ ...project });
    } else {
      setEditingProject(null);
      setFormData({ title: '', category: 'Website', description: '', image: '', link: '' });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!projectToDelete) return;
    const idToDelete = String(projectToDelete.id);
    const updated = projects.filter(p => String(p.id) !== idToDelete);
    setProjects(updated);
    savePortfolio(updated);
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingProject) {
      updated = projects.map(p => String(p.id) === String(editingProject.id) ? { ...p, ...formData } : p);
    } else {
      updated = [...projects, { id: String(Date.now()), ...formData }];
    }
    setProjects(updated);
    savePortfolio(updated);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h1>Kelola Portofolio</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ gap: 'var(--space-xs)' }}>
          <Plus size={18} /> Tambah Proyek
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
        {projects.map((project) => (
          <div key={project.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: 'var(--space-md)' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold' }}>{project.category}</span>
              <h3 style={{ margin: '5px 0' }}>{project.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                <button type="button" onClick={() => handleOpenModal(project)} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}><Edit2 size={18} /></button>
                <button type="button" onClick={() => confirmDelete(project)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2>{editingProject ? 'Edit Proyek' : 'Tambah Proyek'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Judul Proyek</label>
                  <input 
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Kategori</label>
                  <select 
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Website">Website</option>
                    <option value="Android">Android</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Akademik">Akademik</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Upload Gambar Lokal</label>
                <div style={{ border: '2px dashed var(--border)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  {formData.image && <img src={formData.image} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '10px' }} />}
                  <label className="btn" style={{ background: '#f1f5f9', cursor: 'pointer', gap: '10px', display: 'inline-flex' }}>
                    <Upload size={18} /> {formData.image ? 'Ganti Gambar' : 'Pilih Gambar'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Deskripsi Proyek</label>
                <textarea 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', minHeight: '80px' }}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Link Proyek (Opsional)</label>
                <input 
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: 'var(--space-xs)' }}>
                <Save size={18} /> Simpan Proyek
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
            <h3>Hapus Proyek?</h3>
            <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Anda akan menghapus proyek <strong>{projectToDelete?.title}</strong> secara permanen.</p>
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
