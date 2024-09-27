import { submission } from "@/api/submission";
import { submit } from "@/api/submit";
import SelectLanguages from "@/components/ui/SelectLanguages";
import boilerplates from "@/data/boilerplates.json";
import {
  type ChildComponentProps,
  type CodeSubmission,
  type TaskResult,
  type runCodeInterface,
} from "@/schemas/api";
import Editor, { loader, type OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SubmitCodeWindow from "./Submitcodewindow";

// Load the Monaco Editor

export default function CodeEditor({
  handleRun,
  isRunClicked,
  setisRunClicked,
  setlatestClicked,
  selectedquestionId,
  codeData,
  setCodeData,
}: ChildComponentProps) {
  const [sourceCode, setSourceCode] = useState("");
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const questionId = selectedquestionId; // Use selectedquestionId directly

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for button submission

  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);
  const [lastSubmittedQuestionId, setLastSubmittedQuestionId] = useState<
    string | null
  >(null);

  const localStorageCodeKey = `code-${questionId}-${languageId}`;
  const localStorageLanguageKey = `language-${questionId}`;
  const localStorageSubmissionResultKey = `submission-result-${questionId}`;

  useEffect(() => {
    loader
      .init()
      .then((monaco) => {
        monaco.editor.defineTheme("gruvbox-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "", foreground: "ebdbb2", background: "282828" },
            { token: "keyword", foreground: "fb4934" },
            { token: "string", foreground: "b8bb26" },
            { token: "number", foreground: "d3869b" },
            { token: "comment", foreground: "928374" },
          ],
          colors: {
            "editor.background": "#282828",
            "editor.foreground": "#ebdbb2",
            "editorCursor.foreground": "#ebdbb2",
            "editor.lineHighlightBackground": "#3c3836",
            "editorLineNumber.foreground": "#928374",
            "editor.selectionBackground": "#504945",
            "editor.inactiveSelectionBackground": "#3c3836",
          },
        });
      })
      .catch((error) =>
        console.error("An error occurred during initialization of Monaco: ", error),
      );
  }, []);

  // Load saved code and language from localStorage
  useEffect(() => {
    // Retrieve saved language for this question
    const savedLanguageId = localStorage.getItem(localStorageLanguageKey);

    if (savedLanguageId) {
      setLanguageId(parseInt(savedLanguageId));
      setSourceCode(
        (boilerplates as Record<string, string>)[savedLanguageId.toString()] ??
          boilerplates["71"],
      ); // Load corresponding boilerplate
    } else {
      setLanguageId(71);
      localStorage.setItem(`language-${selectedquestionId}`, "71");

      setSourceCode(boilerplates["71"]);
      localStorage.setItem(`code-${selectedquestionId}-71`, boilerplates["71"]);
    }
    // Retrieve saved code for this language and question
    const savedCode = localStorage.getItem(localStorageCodeKey);
    if (savedCode) {
      setSourceCode(savedCode);
    }
    const savedSubmissionResult = localStorage.getItem(
      localStorageSubmissionResultKey,
    );
    if (savedSubmissionResult) {
      setTaskResult(JSON.parse(savedSubmissionResult) as TaskResult);
    } else {
      setTaskResult(null);
    }
  }, [
    questionId,
    localStorageCodeKey,
    localStorageLanguageKey,
    selectedquestionId,
    localStorageSubmissionResultKey,
  ]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  function handleOnChange(value: string | undefined) {
    if (value) {
      setSourceCode(value);
      localStorage.setItem(localStorageCodeKey, value);
    }
  }

  const handleLanguageChange = (id: number) => {
    setLanguageId(id);
    setSourceCode(
      (boilerplates as Record<string, string>)[id.toString()] ??
        boilerplates["71"],
    );
    localStorage.setItem(localStorageLanguageKey, id.toString());
  };

  async function handleSubmitCode() {
    const codeSubmission: CodeSubmission = {
      source_code: sourceCode,
      language_id: languageId,
      question_id: questionId,
    };
  
    try {
      localStorage.removeItem(localStorageSubmissionResultKey);
      setCodeData(null);
      setTaskResult(null);
      setIsSubmitting(true);
      setisRunClicked(true);
      setlatestClicked("submit");
  
      const submissionId = await submit(codeSubmission);
      
  
      let response: TaskResult | null = null;
      let retries = 0;
      const maxRetries = 3;
      const retryDelay = 1000; // 1 seconds
  
      while (retries < maxRetries) {
        try {
          response = await submission(submissionId);
          break; // If successful, exit the retry loop
        } catch (error: any) {
          if (error.status === 504||408) {
            retries++;
            if (retries < maxRetries) {
              
              await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
              toast.error("Max retries reached. Submission failed.");
            }
          } else {
            toast.error("Something went wrong") ; // If it's not a timeout error, rethrow it
          }
        }
      }
  
      if (response) {
        setTaskResult(response);
        localStorage.setItem(
          localStorageSubmissionResultKey,
          JSON.stringify(response)
        );
      } else {
        toast.error("Something went wrong");
      }
    }  finally {
      setIsSubmitting(false);
      setisRunClicked(false);
    }
  }

  const runCodeParams: runCodeInterface = {
    source_code: sourceCode,
    language_id: languageId,
    question_id: questionId,
  };

  return (
    <div className="flex items-center justify-center bg-[#131313]">
      <div className="w-full p-4">
        <div className="mb-4 flex items-center text-xl text-white">
          Languages:
          <div className="w-[150px] pl-4">
            <SelectLanguages
              value={languageId}
              onChange={handleLanguageChange}
            />
          </div>
        </div>

        <div className="flex rounded-3xl">
          <Editor
            theme="gruvbox-dark"
            height="50vh"
            defaultLanguage="cpp"
            value={sourceCode}
            onMount={handleEditorDidMount}
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4 flex w-full items-center">
          <div className="mt-4 flex w-full justify-end space-x-4">
            <button
              onClick={() => {
                handleRun(runCodeParams);
              }}
              className="rounded bg-[#242424] px-4 py-2 text-white disabled:bg-[#24242488] disabled:text-[#ffffff85]"
              disabled={isRunClicked}
            >
              {isRunClicked ? "Cooking..." : "Cook"}
            </button>
            <button
              className={`rounded py-2 text-white ${
                isSubmitting ? "bg-gray-500" : "bg-orange-600"
              } w-28`}
              onClick={handleSubmitCode}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cooking..." : "Submit Code"}
            </button>
          </div>
        </div>

        {taskResult && !codeData && <SubmitCodeWindow taskres={taskResult} />}
      </div>
    </div>
  );
}
