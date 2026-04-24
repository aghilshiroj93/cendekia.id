'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Globe, Share2, LogOut, Briefcase } from 'lucide-react';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // Jika sedang di halaman login, tampilkan konten tanpa sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Tampilkan loading sebentar jika belum terverifikasi
  if (!isAuthorized) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <img src="/images/logo.jpeg" alt="Logo" style={{ width: '35px', height: '35px' }} />
             <h2 style={{ fontSize: '1.2rem', margin: 0 }}>CENDEKIA<span>.ID</span></h2>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/services" className={`${styles.navItem} ${pathname === '/admin/services' ? styles.active : ''}`}>
            <Globe size={20} />
            <span>Kelola Layanan</span>
          </Link>
          <Link href="/admin/portfolio" className={`${styles.navItem} ${pathname === '/admin/portfolio' ? styles.active : ''}`}>
            <Briefcase size={20} />
            <span>Kelola Portofolio</span>
          </Link>
          <Link href="/admin/social" className={`${styles.navItem} ${pathname === '/admin/social' ? styles.active : ''}`}>
            <Share2 size={20} />
            <span>Kelola Sosmed</span>
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logout} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <Link href="/" style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '10px', display: 'block' }}>
            Lihat Website
          </Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
