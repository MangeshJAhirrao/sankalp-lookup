'use client';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import './styles.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleLookup = async () => {
    try {
      const response = await axios.post('/api/lookup', { email: email.trim() });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <header>
        <Image src="/Sankalp.jpg" alt="Sankalp Los Angeles 2024" layout="fill" objectFit="cover" quality={100} />
        <div className="overlay">
          <h1>Email Lookup</h1>
        </div>
      </header>
      <main>
        <div className="search-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="email-input"
          />
          <button onClick={handleLookup} className="lookup-button">Lookup</button>
        </div>
        {error && <p className="error">{error}</p>}
        {result && (
          <div className="results-grid">
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="result-card">
                <h3>{key}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}