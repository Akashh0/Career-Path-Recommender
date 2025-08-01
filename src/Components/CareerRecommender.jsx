import React, { useState } from "react";
import CareerForm from "./CareerForm";
import RecommendationResult from "./RecommendationResult";

const CareerRecommender = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <CareerForm onResult={setResult} />
      <RecommendationResult result={result} />
    </div>
  );
};

export default CareerRecommender;
