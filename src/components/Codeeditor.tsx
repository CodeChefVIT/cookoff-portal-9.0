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
import axios from "axios";
import type * as monaco from "monaco-editor";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SubmitCodeWindow from "./Submitcodewindow";
import { type TimerResponse } from "./ui/timer";

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
  const router = useRouter();
  const [sourceCode, setSourceCode] = useState("");
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const questionId = selectedquestionId; // Use selectedquestionId directly

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for button submission

  const [taskResult, setTaskResult] = useState<TaskResult | null>(null);

  const localStorageCodeKey = `code-${questionId}-${languageId}`;
  const localStorageLanguageKey = `language-${questionId}`;
  const localStorageSubmissionResultKey = `submission-result-${questionId}`;

  async function runCode(runCodeParams: runCodeInterface) {
    setIsSubmitting(true);
    await handleRun(runCodeParams);
    setIsSubmitting(false);
  }

  useEffect(() => {
    loader
      .init()
      .then((monaco) => {
        monaco.editor.defineTheme("gruvbox-dark", {
          base: "vs-dark",
          inherit: false,
          rules: [
            { token: "", foreground: "ebdbb2", background: "32302f" }, // Default text
            { token: "invalid", foreground: "fb4934" }, // Error
            { token: "emphasis", fontStyle: "italic" },
            { token: "strong", fontStyle: "bold" },

            { token: "variable", foreground: "d79921" }, // Variable
            { token: "variable.predefined", foreground: "fabd2f" }, // Predefined variable
            { token: "constant", foreground: "d3869b" }, // Constants
            { token: "comment", foreground: "928374" }, // Comment
            { token: "number", foreground: "d3869b" }, // Number
            { token: "number.hex", foreground: "8ec07c" }, // Hex number
            { token: "regexp", foreground: "b8bb26" }, // Regex
            { token: "annotation", foreground: "fe8019" }, // Annotation
            { token: "type", foreground: "83a598" }, // Type

            { token: "delimiter", foreground: "ebdbb2" }, // Delimiters
            { token: "delimiter.html", foreground: "d5c4a1" },
            { token: "delimiter.xml", foreground: "83a598" },

            { token: "tag", foreground: "fb4934" }, // Tags (HTML/XML)
            { token: "tag.id.pug", foreground: "83a598" },
            { token: "tag.class.pug", foreground: "fabd2f" },
            { token: "meta.scss", foreground: "fabd2f" }, // SCSS meta
            { token: "metatag", foreground: "fb4934" }, // Metatags
            { token: "metatag.content.html", foreground: "b8bb26" },
            { token: "metatag.html", foreground: "928374" },
            { token: "metatag.xml", foreground: "928374" },
            { token: "metatag.php", fontStyle: "bold" },

            { token: "key", foreground: "fabd2f" }, // Object keys
            { token: "string.key.json", foreground: "d79921" },
            { token: "string.value.json", foreground: "b8bb26" },

            { token: "attribute.name", foreground: "fb4934" }, // Attribute names
            { token: "attribute.value", foreground: "b8bb26" }, // Attribute values
            { token: "attribute.value.number", foreground: "d3869b" },
            { token: "attribute.value.unit", foreground: "d3869b" },
            { token: "attribute.value.html", foreground: "8ec07c" },
            { token: "attribute.value.xml", foreground: "8ec07c" },

            { token: "string", foreground: "b8bb26" }, // Strings
            { token: "string.html", foreground: "8ec07c" },
            { token: "string.sql", foreground: "b8bb26" },
            { token: "string.yaml", foreground: "b8bb26" },

            { token: "keyword", foreground: "fb4934" }, // Keywords
            { token: "keyword.json", foreground: "fb4934" },
            { token: "keyword.flow", foreground: "fb4934" },
            { token: "keyword.flow.scss", foreground: "fb4934" },

            { token: "operator.scss", foreground: "fe8019" }, // Operators
            { token: "operator.sql", foreground: "fabd2f" },
            { token: "operator.swift", foreground: "fe8019" },
            { token: "predefined.sql", foreground: "fabd2f" }, // Predefined SQL
          ],
          colors: {
            "editor.background": "#32302f", // Dark background
            "editor.foreground": "#ebdbb2", // Light text
            "editor.selectionBackground": "#665c54", // Selected text
            "editor.inactiveSelectionBackground": "#504945",
            "editor.lineHighlightBackground": "#3c3836", // Line highlight
            "editorCursor.foreground": "#fe8019", // Cursor
            "editorWhitespace.foreground": "#7c6f64", // Whitespace
            "editorIndentGuide.background": "#504945", // Indentation guide
            "editorIndentGuide.activeBackground": "#665c54", // Active indentation guide
            "editor.selectionHighlight": "#bdae9350", // Selection highlight
          },
        });
      })
      .catch((error) =>
        console.error(
          "An error occurred during initialization of Monaco: ",
          error,
        ),
      );
  }, []);

  function handleSyntax(id: number): string {
    switch (id) {
      case 71:
        return "python";
      case 62:
        return "java";
      case 50:
        return "c";
      case 54:
        return "cpp";
      case 63:
        return "javascript";
      case 73:
        return "rust";
      case 60:
        return "go";
      default:
        return "plaintext";
    }
  }

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
      try {
        const timer = await axios.get<TimerResponse>("/api/countdown");
        if (timer.data.remainingTime <= 0) {
          toast.error("Time is up");
          setisRunClicked(false);
          return;
        }
      } catch {
        toast.error("Timer not started");
        setisRunClicked(false);
        setTimeout(() => {
          router.push("/kitchen");
        }, 1000);
        return;
      }
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
          break;
        } catch (error) {
          if (error instanceof ApiError) {
            if (error.statusCode === 504 || error.statusCode === 408) {
              retries++;
              if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
              } else {
                toast.error("Max retries reached. Submission failed.");
              }
            } else {
              toast.error("Something went wrong");
            }
          } else {
            toast.error("Something went wrong");
          }
        }
      }

      if (response) {
        setTaskResult(response);
        localStorage.setItem(
          localStorageSubmissionResultKey,
          JSON.stringify(response),
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
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
            defaultLanguage={"python"}
            language={handleSyntax(languageId)}
            value={sourceCode}
            onMount={handleEditorDidMount}
            onChange={handleOnChange}
            options={{ minimap: { enabled: false } }}
          />
        </div>

        <div className="mt-4 flex w-full items-center">
          <div className="mt-4 flex w-full justify-end space-x-4">
            <button
              onClick={() => {
                void runCode(runCodeParams);
              }}
              className="rounded bg-[#242424] px-4 py-2 text-cream hover:bg-orange-600 hover:text-white disabled:bg-[#24242488] disabled:text-[#ffffff85]"
              disabled={isRunClicked}
            >
              {isRunClicked ? "Cooking..." : "Run Code"}
            </button>
            <button
              className={`rounded py-2 text-white ${
                isSubmitting ? "bg-gray-500" : "bg-orange-600"
              } w-28 hover:bg-[#242424] hover:text-cream`}
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
