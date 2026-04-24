'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import styles from './Login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded password as requested (can be changed)
    if (password === 'cendekia2026') {
      localStorage.setItem('admin_token', 'secure_token_123');
      router.push('/admin');
    } else {
      setError('Password salah! Silakan coba lagi.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={`${styles.loginCard} card`} onSubmit={handleLogin}>
        <div className={styles.iconWrapper}>
          <Lock size={32} />
        </div>
        <h2>Admin Login</h2>
        <p>Hanya untuk pemilik CENDEKIA.ID</p>
        
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password admin"
            required
          />
        </div>
        
        {error && <p className={styles.error}>{error}</p>}
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Masuk ke Dashboard
        </button>
      </form>
    </div>
  );
}
