// src/components/CareerForm.jsx
import React, { useState } from 'react';
import RecommendationResult from './RecommendationResult';
import './CareerForm.css';

export default function CareerForm() {
  const [interest, setInterest] = useState('');
  const [qualification, setQualification] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest, qualification }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('🚨 Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="career-form" onSubmit={handleSubmit}>
        <h2 className="form-title">🚀 Career Path Recommender</h2>

        <input
          type="text"
          placeholder="Your Interest (e.g. AI, Design...)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Your Qualification (e.g. 12th, B.Sc...)"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Processing...' : 'Generate Recommendation'}
        </button>
      </form>

      {result && <RecommendationResult data={result} />}
    </div>
  );
}
