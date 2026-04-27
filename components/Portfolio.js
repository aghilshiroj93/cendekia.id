'use client';
import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { getPortfolio } from '@/lib/storage';
import ScrollReveal from './ScrollReveal';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setProjects(getPortfolio());
  }, []);

  const openDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  if (projects.length === 0) return null;

  return (
    <section id="portfolio" className={`${styles.portfolio} section`}>
      <div className="container">
        <ScrollReveal className={styles.header}>
          <h2 className={styles.title}>Portofolio Unggulan</h2>
          <p className={styles.subtitle}>Hasil karya terbaik kami untuk klien yang cerdas.</p>
        </ScrollReveal>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ScrollReveal 
              key={index} 
              className={`${styles.projectCard} delay-${(index % 5) + 1}`} 
              onClick={() => openDetail(project)}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.category}>{project.category}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.viewLink}>Klik untuk Detail</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeDetail}>
          <div className={`${styles.modalContent} animate-fade-in`} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeDetail}><X size={24} /></button>
            <div className={styles.modalGrid}>
              <div className={styles.modalImageWrapper}>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className={styles.modalInfo}>
                <span className={styles.modalCategory}>{selectedProject.category}</span>
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                {selectedProject.link && selectedProject.link !== '#' && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ gap: '10px', marginTop: '20px' }}>
                    <ExternalLink size={18} /> Kunjungi Proyek
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
