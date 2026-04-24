'use client';
import { useEffect, useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  BarChart3, 
  FileText, 
  BookOpen, 
  Presentation 
} from 'lucide-react';
import { getServices } from '@/lib/storage';
import styles from './Services.module.css';

const ICON_MAP = {
  Globe: <Globe size={32} />,
  Smartphone: <Smartphone size={32} />,
  BarChart3: <BarChart3 size={32} />,
  FileText: <FileText size={32} />,
  BookOpen: <BookOpen size={32} />,
  Presentation: <Presentation size={32} />
};

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(getServices());
  }, []);

  if (services.length === 0) return null;

  return (
    <section id="services" className="section">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Layanan Kami</h2>
          <p className={styles.subtitle}>Solusi lengkap untuk kebutuhan digital dan akademik Anda.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.card} card`}>
              <div className={styles.icon}>{ICON_MAP[service.icon] || <Globe size={32} />}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
