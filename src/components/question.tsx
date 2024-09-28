/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { byRound } from "@/api/question";
import { type Question } from "@/schemas/api";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

interface QuestionProps {
  onQuestionSelect: (id: string) => void;
}

export default function Question({ onQuestionSelect }: QuestionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >();
  const router = useRouter();

  const handleQuestionChange = (id: string, index: number) => {
    setSelectedQuestionId(id);
    onQuestionSelect(id);
    setSelectedQuestionIndex(index);
  };

  useEffect(() => {
    const temp = questions.find(
      (question) => question.ID === selectedQuestionId,
    );
    setSelectedQuestion(temp);
  }, [questions, selectedQuestionId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await byRound();
        const fetchedQuestions = response.map((item) => item.question);
        setQuestions(fetchedQuestions);
        if (fetchedQuestions[0]) {
          setSelectedQuestionId(fetchedQuestions[0].ID);
          onQuestionSelect(fetchedQuestions[0].ID);
          setSelectedQuestionIndex(0);
          setSelectedQuestion(fetchedQuestions[0]);
        }
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 401) {
          router.push("/");
          return;
        }
        router.push("/dashboard");
      }
    };

    void fetchQuestions();
  }, [router]);

  return (
    <div className="flex h-[83vh] w-[45%] flex-row overflow-y-scroll bg-gray1 2xl:h-[86vh]">
      <div className="sticky top-0 flex flex-col text-white">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionChange(question.ID, index)}
            className={`flex h-full items-center justify-center border-b border-gray-700 px-4 text-center text-xl last:border-0 ${question.ID === selectedQuestionId ? "bg-gray1" : "bg-black"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="ml-2 w-screen text-white">
        {selectedQuestion && (
          <div className="p-4">
            <span className="text-3xl font-bold text-accent">
              PROBLEM {selectedQuestionIndex + 1}: {selectedQuestion.Title}
            </span>
            <div className="w-[80px] bg-lightcream2 text-center text-sm text-lightcream">
              {selectedQuestion.Points} Points
            </div>
            <div className="my-5">
              <span className="mr-8 text-xl text-accent">Problem</span>
            </div>
            <Markdown className="whitespace-pre-line">
              {selectedQuestion.Description}
            </Markdown>

            {selectedQuestion.InputFormat && (
              <div className="mt-4">
                <strong>Input Format:</strong>
                <Markdown>
                  {selectedQuestion.InputFormat.map((item) => `- ${item}`).join(
                    "\n",
                  )}
                </Markdown>
              </div>
            )}

            {selectedQuestion.Constraints && (
              <div className="mt-4">
                <strong>Constraints:</strong>
                <Markdown>
                  {selectedQuestion.Constraints.map((item) => `- ${item}`).join(
                    "\n",
                  )}
                </Markdown>
              </div>
            )}

            {selectedQuestion.OutputFormat && (
              <div className="mt-4">
                <strong>Output Format:</strong>
                <Markdown>
                  {selectedQuestion.OutputFormat.map(
                    (item) => `- ${item}`,
                  ).join("\n")}
                </Markdown>
              </div>
            )}

            {(() => {
              const sampleCount = Math.max(
                selectedQuestion.SampleTestInput?.length || 0,
                selectedQuestion.SampleTestOutput?.length || 0,
                selectedQuestion.Explanation?.length || 0,
              );

              return Array.from({ length: sampleCount }).map((_, i) => (
                <div key={i}>
                  {selectedQuestion.SampleTestInput?.[i] && (
                    <div className="mt-4">
                      <strong>Sample Input {i}:</strong>
                      <SyntaxHighlighter
                        language="plaintext"
                        style={vscDarkPlus}
                        className="my-2 rounded-md"
                      >
                        {selectedQuestion.SampleTestInput[i]}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  {selectedQuestion.SampleTestOutput?.[i] && (
                    <div className="mt-4">
                      <strong>Sample Output {i}:</strong>
                      <SyntaxHighlighter
                        language="plaintext"
                        style={vscDarkPlus}
                        className="my-2 rounded-md"
                      >
                        {selectedQuestion.SampleTestOutput[i]}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  {selectedQuestion.Explanation?.[i] && (
                    <div className="mt-4">
                      <strong>Explanation {i}:</strong>
                      <Markdown>{selectedQuestion.Explanation[i]}</Markdown>
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
