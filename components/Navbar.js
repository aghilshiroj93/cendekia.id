import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.jpeg" alt="CENDEKIA.ID" width={40} height={40} className={styles.logoImg} />
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
