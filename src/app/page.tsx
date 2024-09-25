"use client";

import { useState } from "react";
import Question from "@/components/question";
import EditorWindow from "@/components/editorwindow/EditorWindow";
import QuesNavbar from "@/components/quesNavBar";

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