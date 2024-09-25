"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/api";

interface Question {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string;
  Points: number;
  Round: number;
  Constraints: string;
  OutputFormat: string;
}

interface QuestionProps {
  onQuestionSelect: (id: string) => void;
}

const Question: React.FC<QuestionProps> = ({ onQuestionSelect }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | undefined>(undefined);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await api.get("question/round");
      const fetchedQuestions = response.data.map((item: { question: Question }) => item.question);
      setQuestions(fetchedQuestions);

      if (fetchedQuestions.length > 0) {
        const firstQuestion = fetchedQuestions[0];
        setSelectedQuestionId(firstQuestion.ID);
        setSelectedQuestion(firstQuestion);
        onQuestionSelect(firstQuestion.ID);
        setSelectedQuestionIndex(0);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [onQuestionSelect]);

  const handleQuestionChange = (id: string, index: number) => {
    setSelectedQuestionId(id);
    setSelectedQuestionIndex(index);
    onQuestionSelect(id);
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    const selected = questions.find((question) => question.ID === selectedQuestionId);
    setSelectedQuestion(selected);
  }, [selectedQuestionId, questions]);

  return (
    <div className="bg-gray1 flex flex-row h-[86vh] w-[45%] overflow-y-scroll">
      <div className="flex flex-col w-[3vw] text-white">
        {questions.map((question, index) => (
          <div
            key={question.ID}
            onClick={() => handleQuestionChange(question.ID, index)}
            className={`flex justify-center items-center h-[80px] p-[22px] text-xl text-center border-b border-gray-700 cursor-pointer ${
              question.ID === selectedQuestionId ? "bg-gray1" : "bg-black"
            }`}>
            <span className="h-full">{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="ml-2 w-screen p-4 text-white">
        {selectedQuestion && (
          <div>
            <span className="text-accent text-3xl font-bold">
              PROBLEM {selectedQuestionIndex + 1}: {selectedQuestion.Title}
            </span>
            <div className="bg-lightcream2 text-lightcream w-[80px] text-sm text-center">
              {selectedQuestion.Points} Points
            </div>
            <div className="my-5">
              <span className="text-accent text-xl mr-8">Problem</span>
              <span className="text-lightcream text-xl">My Submissions</span>
            </div>
            <p>{selectedQuestion.Description}</p>
            <br />
            <p>
              <strong>Input Format:</strong>
              <br />
              {selectedQuestion.InputFormat}
            </p>
            <br />
            <p>
              <strong>Constraints:</strong>
              <br />
              {selectedQuestion.Constraints}
            </p>
            <br />
            <p>
              <strong>Output Format:</strong>
              <br />
              {selectedQuestion.OutputFormat}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
