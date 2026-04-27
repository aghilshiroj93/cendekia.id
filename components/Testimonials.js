'use client';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { getTestimonials } from '@/lib/storage';
import ScrollReveal from './ScrollReveal';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="section" style={{ background: '#fcfcfc' }}>
      <div className="container">
        <ScrollReveal style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Apa Kata Klien Kami?</h2>
          <p style={{ color: 'var(--secondary)' }}>Kepuasan klien adalah prioritas utama CENDEKIA.ID.</p>
        </ScrollReveal>
        
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <ScrollReveal key={t.id} className={styles.card}>
              <Quote className={styles.icon} />
              <p className={styles.content}>{t.content}</p>
              <div className={styles.footer}>
                <div className={styles.avatar}>{t.name.charAt(0)}</div>
                <div>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
