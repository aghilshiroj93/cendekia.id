import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`${styles.hero} animate-fade-in`}>
      <div className={`${styles.container} container`}>
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
            <a href="#social" className="btn" style={{border: '1px solid var(--border)'}}>Hubungi Kami</a>
          </div>
        </div>
      </div>
    </section>
  );
}
