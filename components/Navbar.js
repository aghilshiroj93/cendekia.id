import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>C</div>
          <span>CENDEKIA</span>.ID
        </Link>
        <ul className={styles.links}>
          <li><Link href="#services">Layanan</Link></li>
          <li><Link href="#portfolio">Portofolio</Link></li>
          <li><Link href="#social">Kontak</Link></li>
        </ul>
      </div>
    </nav>
  );
}
