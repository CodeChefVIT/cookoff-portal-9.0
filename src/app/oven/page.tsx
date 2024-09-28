"use client";
import EditorWindow from "@/components/EditorWindow";
import QuesNavbar from "@/components/quesNavBar";
import Question from "@/components/question";
import { useState } from "react";

export default function HomePage() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");

  const handleSelectedQuestionId = (id: string) => {
    setSelectedQuestionId(id);
  };

  return (
    <main className="overflow-y-none">
      <QuesNavbar />
      <div className="flex bg-dark2">
        <Question onQuestionSelect={handleSelectedQuestionId} />
        <EditorWindow selectedQuestionId={selectedQuestionId} />
      </div>
    </main>
  );
}
