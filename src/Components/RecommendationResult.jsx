import React from "react";

const RecommendationResult = ({ result }) => {
  if (!result) return null;

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>🎯 Recommended Course:</h2>
      <p><strong>{result.recommended_course}</strong></p>

      <h3>📚 Related Courses:</h3>
      <ul>
        {result.related_courses.map((course, idx) => (
          <li key={idx}>{course}</li>
        ))}
      </ul>

      <h3>📊 Academic Roadmap (raw JSON):</h3>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#f0f0f0",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {JSON.stringify(result.roadmap, null, 2)}
      </pre>
    </div>
  );
};

export default RecommendationResult;
