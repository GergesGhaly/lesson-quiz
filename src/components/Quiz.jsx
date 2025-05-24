import React from "react";

export default function Quiz({ questions, current, onAnswer }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontSize: "20px",
        justifyContent: "center",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>{questions[current].question}</h3>
      {questions[current].answers.map((answer, index) => (
        <button
          key={index}
          style={{
            display: "block",
            margin: "8px auto",
            padding: "10px",
            fontSize: "20px",
            width: "100%",
            maxWidth: "400px",
          }}
          onClick={() => onAnswer(index)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}
