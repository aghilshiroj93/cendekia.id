export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
        <div className="card">
          <h3 style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Total Layanan</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>6</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Proyek Selesai</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>24</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Social Links</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>3</p>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
        <h2>Selamat Datang, Admin!</h2>
        <p style={{ color: 'var(--secondary)' }}>
          Gunakan menu di sebelah kiri untuk mengelola konten website Anda. Anda dapat menambah, mengubah, atau menghapus layanan dan tautan media sosial.
        </p>
      </div>
    </div>
  );
}
