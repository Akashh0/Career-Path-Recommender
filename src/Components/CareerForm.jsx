// src/pages/RecommendationPage.jsx
import React, { useState } from 'react';
import './CareerForm.css';

export default function CareerForm() {
  const [interest, setInterest] = useState('');
  const [qualification, setQualification] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('http://localhost:8000/api/recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest, qualification })
      });

      if (!res.ok) throw new Error('Recommendation failed.');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-container">
      <form onSubmit={handleSubmit} className="recommendation-form">
        <h2>📚 Get Your Career Path</h2>
        <input
          type="text"
          placeholder="Your Interests (e.g., AI, Web Dev)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your Current Qualification (e.g., 12th, Diploma)"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Recommending...' : 'Recommend'}</button>
      </form>

      {error && <p className="error">❌ {error}</p>}

      {result && (
        <div className="recommendation-result">
          <h3>🎯 Top Recommendation:</h3>
          <p className="highlight">{result.recommended_course}</p>

          <h4>📌 Related Courses:</h4>
          <ul>
            {result.related_courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>

          <h4>🗺️ Roadmap:</h4>
          <pre className="roadmap-preview">
            {Object.entries(result.roadmap).map(([key, value], i) => (
              <div key={i}>
                <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? '[Structured Data]' : value}
              </div>
            ))}
          </pre>

          <a
            className="download-btn"
            href="http://localhost:8000/media/courses.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            📥 Download Full PDF Roadmap
          </a>
        </div>
      )}
    </div>
  );
}