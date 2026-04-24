'use client';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { getInfo } from '@/lib/storage';
import styles from './Footer.module.css';

export default function Footer() {
  const [info, setInfo] = useState({ address: '', phone: '', email: '', hours: '' });

  useEffect(() => {
    setInfo(getInfo());
  }, []);

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
              Solusi digital cerdas untuk Website, Android, Data Science, dan kebutuhan Akademik Anda.
            </p>
          </div>

          <div className={styles.infoSection}>
            <h4>Layanan Kami</h4>
            <ul>
              <li>Website Development</li>
              <li>Android Development</li>
              <li>Data Science Analysis</li>
              <li>Bantuan Akademik</li>
            </ul>
          </div>

          <div className={styles.infoSection}>
            <h4>Kontak & Lokasi</h4>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} />
                <span>{info.address}</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+{info.phone}</span>
              </li>
              <li>
                <Mail size={18} />
                <span>{info.email}</span>
              </li>
              <li>
                <Clock size={18} />
                <span>{info.hours}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} CENDEKIA.ID - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
