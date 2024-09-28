"use client";
import api from "@/api";
import Codeeditor from "@/components/Codeeditor";
import TestCases from "@/components/TestCases";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { type TimerResponse } from "./ui/timer";

interface runCodeInterface {
  source_code: string;
  language_id: number;
  question_id: string;
}

export interface runData {
  no_testcases_passed: number;
  result: [];
}

interface EditorWindowProps {
  selectedQuestionId: string;
}

export default function EditorWindow({
  selectedQuestionId,
}: EditorWindowProps) {
  const router = useRouter();
  const [isRunClicked, setIsRunClicked] = useState(false);
  const [codeData, setCodeData] = useState<runData | null>(null);
  const [latestClicked, setLatestClicked] = useState<string | null>(null);
  const [lastSubmittedQuestionId, setLastSubmittedQuestionId] = useState<
    string | null
  >(null);
  useEffect(() => {
    setCodeData(null);
  }, [selectedQuestionId]);

  async function handleRun({
    source_code,
    language_id,
    question_id,
  }: runCodeInterface) {
    setIsRunClicked(true);

    const sendData: runCodeInterface = {
      source_code,
      language_id,
      question_id,
    };

    try {
      try {
        const timer = await axios.get<TimerResponse>("/api/countdown");
        if (timer.data.remainingTime <= 0) {
          toast.error("Time is up");
          setIsRunClicked(false);
          setTimeout(() => {
            router.push("/kitchen");
          }, 1000);
          return;
        }
      } catch {
        toast.error("Timer not started");
        setIsRunClicked(false);
        setTimeout(() => {
          router.push("/kitchen");
        }, 1000);
        return;
      }

      const response = await api.post<runData>("/runcode", sendData);
      setCodeData(response.data);
      setLatestClicked("run");
      setLastSubmittedQuestionId(selectedQuestionId);
    } catch {
    } finally {
      setIsRunClicked(false);
    }
  }

  return (
    <div className="h-[83vh] w-[55%] overflow-y-auto bg-[#131313] px-3 2xl:h-[86vh]">
      <Codeeditor
        selectedquestionId={selectedQuestionId}
        isRunClicked={isRunClicked}
        setisRunClicked={setIsRunClicked}
        handleRun={handleRun}
        latestClicked={latestClicked}
        setlatestClicked={setLatestClicked}
        codeData={codeData}
        setCodeData={setCodeData}
      />

      {codeData &&
        latestClicked === "run" &&
        lastSubmittedQuestionId === selectedQuestionId && (
          <TestCases codeData={codeData} />
        )}
    </div>
  );
}
