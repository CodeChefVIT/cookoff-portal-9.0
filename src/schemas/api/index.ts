import { type runData } from "@/components/EditorWindow";
import { type Dispatch, type SetStateAction } from "react";

export interface ApiResponse {
  message: string;
  data: unknown;
}

export interface User {
  round: number;
  score: number | null;
  username: string;
}
export interface CodeSubmission {
  source_code: string;
  language_id: number;
  question_id: string;
}
export interface SubmissionResponse {
  submission_id: string;
}
export interface CodeEditorProps {
  selectedquestionId: string;
}

export interface Submission {
  title: string;
  description: string | null;
  score: number;
  max_score: number;
}
export interface dashboard {
  round: number;
  score: number;
  submissions: Record<string, Submission[]>;
  username: string;
}

export interface APIResponse {
  message: string;
  data: dashboard;
}

export interface profileData {
  round: number;
  score: number;
  username: string;
}

export interface Question {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string[];
  Points: number;
  Round: number;
  Constraints: string[];
  OutputFormat: string[];
  SampleTestInput: string[];
  SampleTestOutput: string[];
  Explanation: string[];
}

////

export interface runCodeInterface {
  source_code: string;
  language_id: number;
  question_id: string;
}

export interface ChildComponentProps {
  handleRun: (runCodeInterface: runCodeInterface) => Promise<void>;
  isRunClicked: boolean;
  setisRunClicked: Dispatch<SetStateAction<boolean>>;
  selectedquestionId: string;
  latestClicked: string | null;
  setlatestClicked: Dispatch<SetStateAction<string | null>>;
  codeData: runData | null;
  setCodeData: Dispatch<SetStateAction<runData | null>>;
}
interface Testcase {
  testcase_id: string;
  runtime: number;
  memory: number;
  status: string;
  description: string;
}

export interface TaskResult {
  submission_id: string;
  question_id: string;
  testcases_passed: number;
  testcases_failed: number;
  submission_runtime: number;
  submission_memory: number;
  submission_time: string;
  description: string;
  testcases: Testcase[];
}
export interface SubmitCodeWindowProps {
  taskres: TaskResult;
}
