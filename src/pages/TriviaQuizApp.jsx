import React, { useState, useEffect } from "react";

export default function TriviaQuizApp() {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [category, setCategory] = useState("general_knowledge");

  const categories = [
    { value: "general_knowledge", label: "General Knowledge" },
    { value: "science", label: "Science" },
    { value: "film_and_tv", label: "Movies & TV" },
    { value: "geography", label: "Geography" },
    { value: "music", label: "Music" },
    { value: "history", label: "History" },
    { value: "sports_and_leisure", label: "Sports" },
  ];

  // Fetch question from Trivia API
  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    setSelectedAnswer(null);

    try {
      const res = await fetch(
        `https://the-trivia-api.com/api/questions?limit=1&categories=${category}`
      );
      if (!res.ok) throw new Error("Failed to fetch quiz question");
      const data = await res.json();
      const q = data[0];

      // Shuffle options
      const options = [...q.incorrectAnswers, q.correctAnswer].sort(
        () => Math.random() - 0.5
      );

      setQuestionData({ ...q, options });
    } catch (err) {
      setError("Could not load question. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [category]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">Trivia Quiz</h1>

      {/* Category Selector */}
      <div className="mb-6 flex justify-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded border text-gray-700"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading question...</p>}
      {error && !loading && <p className="text-red-500">{error}</p>}

      {!loading && questionData && (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4 text-left">
          <h2 className="text-lg font-semibold">{questionData.question}</h2>
          <p className="text-sm text-gray-500">
            Category: {questionData.category} | Difficulty:{" "}
            {questionData.difficulty}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {questionData.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = questionData.correctAnswer === option;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                  className={`p-3 rounded text-left border transition ${
                    !selectedAnswer
                      ? "hover:bg-gray-100"
                      : isCorrect
                      ? "bg-green-200 border-green-500"
                      : isSelected
                      ? "bg-red-200 border-red-500"
                      : "bg-white"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {selectedAnswer && (
            <button
              onClick={fetchQuestion}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}
