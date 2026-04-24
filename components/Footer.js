import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>C</div>
              <h3>CENDEKIA<span>.ID</span></h3>
            </div>
            <p className={styles.tagline}>
              Membangun masa depan digital dengan kecerdasan dan profesionalisme. Solusi terbaik untuk kebutuhan IT dan Akademik Anda.
            </p>
          </div>
          
          <div className={styles.infoSection}>
            <h4>Layanan Kami</h4>
            <ul>
              <li>Website & Web App</li>
              <li>Aplikasi Android</li>
              <li>Data Science & Analytics</li>
              <li>Bantuan Jurnal & Skripsi</li>
            </ul>
          </div>

          <div className={styles.infoSection}>
            <h4>Kontak & Lokasi</h4>
            <ul className={styles.contactList}>
              <li><MapPin size={18} /> Jl. Teknologi No. 45, Yogyakarta, Indonesia</li>
              <li><Phone size={18} /> +62 812-3456-7890</li>
              <li><Mail size={18} /> halo@cendekia.id</li>
              <li><Clock size={18} /> Sen - Sab: 08.00 - 21.00</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} CENDEKIA.ID - Digital Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
