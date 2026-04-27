'use client';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getSocials } from '@/lib/storage';
import ScrollReveal from './ScrollReveal';
import styles from './SocialLinks.module.css';

const ICON_MAP = {
  whatsapp: <MessageCircle size={24} />,
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  tiktok: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
  )
};

export default function SocialLinks() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    setSocials(getSocials());
  }, []);

  if (socials.length === 0) return null;

  return (
    <section id="social" className={`${styles.social} section`}>
      <div className="container">
        <ScrollReveal className={styles.header}>
          <h2 className={styles.title}>Hubungi Kami</h2>
          <p className={styles.subtitle}>Konsultasi gratis untuk proyek Anda sekarang juga.</p>
        </ScrollReveal>
        <div className={styles.links}>
          {socials.map((link, index) => (
            <ScrollReveal 
              key={index} 
              className={styles.linkCard}
              style={{ '--hover-color': link.color }}
            >
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '15px', width: '100%' }}
              >
                <div className={styles.icon}>{ICON_MAP[link.platform] || <MessageCircle size={24} />}</div>
                <span className={styles.name}>{link.name}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
