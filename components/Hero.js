'use client';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Hero() {
  return (
    <section className={`${styles.hero} animate-fade-in`} style={{ position: 'relative', overflow: 'hidden' }}>
      <Scene3D />
      <div className={`${styles.container} container`} style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.content}>
          <h1 className={`${styles.title} animate-slide-up`}>
            <span>CENDEKIA.ID</span> <br />
            Digital Solutions
          </h1>
          <p className={`${styles.description} animate-slide-up delay-1`}>
            Partner ahli dalam Website, Android, Data Science, dan Bantuan Akademik. Kami hadir untuk memberikan solusi cerdas dan profesional bagi setiap kebutuhan digital Anda.
          </p>
          <div className={`${styles.actions} animate-slide-up delay-2`}>
            <a href="#services" className="btn btn-primary">Lihat Layanan</a>
            <a href="#social" className="btn" style={{border: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)'}}>Hubungi Kami</a>
          </div>
        </div>
      </div>
    </section>
  );
}
