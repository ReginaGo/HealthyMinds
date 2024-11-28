import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ConditionDetails = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const [condition, setCondition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llama al backend para obtener los detalles del padecimiento
    fetch(`http://localhost:5001/condition/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch condition details");
        }
        return response.json();
      })
      .then((data) => {
        setCondition(data.condition); // Actualiza el estado con los datos
        setLoading(false); // Finaliza la carga
      })
      .catch((err) => {
        console.error("Error fetching condition details:", err);
        setError("Failed to load condition details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="container mt-5">
      {condition ? (
        <>
        <br />
        <br />
          <h1>{condition.mental_illness}</h1>
          <img
            src={condition.img}
            className="img-fluid mb-3"
            alt={condition.mental_illness}
          />
          <p>{condition.description}</p>
          <h2>Symptoms:</h2>
          <ul>
            {condition.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>

          <h2>Treatment:</h2>
          <ul>
            {condition.treatment.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>

          <h2>How to Help:</h2>
          <p>{condition.how_to_help}</p>

          <a href="/conditions" className="btn btn-primary mt-3">
            Back to All Conditions
          </a>
          <br />
          <br />
          <br />
        </>
      ) : (
        <p>No details found for this condition.</p>
      )}
    </div>
  );
};

export default ConditionDetails;
