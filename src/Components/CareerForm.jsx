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
      const res = await fetch('https://careerbackend-n66b.onrender.com/api/recommend/', {
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
        <h2>Enter your Interests!</h2>
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
          <h3>Best choices you got!:</h3>
          <p className="highlight">{result.recommended_course}</p>

          <h3>Related Courses:</h3>
          <ul>
            {result.related_courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>

          <h4>🗺️ Roadmap:</h4>

          {result.pdf_path && (
          <a
          className="download-btn"
          href={`https://careerbackend-n66b.onrender.com${result.pdf_path}`}
          download target="_blank"
          rel="noopener noreferrer"
          >
          📥 Download Full PDF Roadmap
          </a>
        )}
        </div>
      )}
    </div>
  );
}