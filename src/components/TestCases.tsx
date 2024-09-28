"use client";
import TestComp from "@/components/TestComp";
import { useEffect, useState } from "react";

interface testCaseProps {
  codeData: codeData;
}

interface codeData {
  no_testcases_passed: number;
  result: testCaseResult[];
}
interface testCaseResult {
  testcase_id: string;
  stdout: string;
  expected_output: string;
  input: string;
  time: string;
  memory: number;
  stderr: string;
  token: string;
  message: string;
  status: {
    id: number;
    description: string;
  };
  compile_output: string;
}

export default function TestCases({ codeData }: testCaseProps) {
  const [allPassed, setAllPassed] = useState(false);
  const [currentTestCase, setcurrentTestCase] = useState(0);
  // const [isClicked, setIsClicked] = useState(true);
  function handleTestClick(testKaKey: number) {
    setcurrentTestCase(testKaKey);
  }
  useEffect(() => {
    if (codeData) {
      if (codeData.no_testcases_passed === codeData.result.length) {
        setAllPassed(true);
      } else {
        setAllPassed(false);
      }
    }
  }, [codeData]);
  return (
    <>
      {codeData ? (
        <div className="flex justify-center">
          <div className="grid h-[60vh] w-full grid-rows-[2fr_5fr_2fr]">
            <div className="flex justify-center">
              <div className="m-3 flex w-full items-center justify-between rounded-lg bg-lightGray px-4 py-3">
                <div>
                  <p
                    className={`${allPassed ? "text-green2" : "text-[#EB3939]"} roboto text-2xl !font-medium`}
                  >
                    {codeData.no_testcases_passed +
                      "/" +
                      codeData.result.length +
                      " "}
                    Test Cases Have Passed {allPassed ? " :-)" : " :'-("}
                  </p>
                  <p className="roboto mt-1 text-sm text-white">
                    {allPassed ? "Great Work!! " : "Try Again!!!"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-3 flex justify-center bg-[#161616] py-1 text-white">
              <div className="flex h-40 w-[40%] flex-col">
                {codeData.result.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleTestClick(index);
                    }}
                  >
                    <TestComp
                      isClicked={currentTestCase === index ? true : false}
                      key={index}
                      isPassed={
                        item.status.description === "Accepted" ? true : false
                      }
                      num={index}
                    />
                  </div>
                ))}
              </div>
              <div className="mx-4 w-[60%]">
                <div className="my-2">
                  <div className="">Message</div>

                  <div
                    className={`${codeData.result[currentTestCase]?.status.description === "Accepted" ? "text-green2" : "text-red-500"} my-2 h-12 rounded-lg bg-lightGray px-4 py-3 text-base`}
                  >
                    {codeData.result[currentTestCase]?.status.description}
                  </div>
                </div>
                {codeData.result[currentTestCase]?.status.description !==
                  "Accepted" && (
                  <div className="my-2">
                    <div className="text-base">Error</div>
                    <div className="my-2 rounded bg-lightGray px-4 py-3 text-base">
                      {codeData.result[currentTestCase]?.compile_output
                        ? codeData.result[currentTestCase].compile_output
                            .split("\n")
                            .map((line, index) => <div key={index}>{line}</div>)
                        : codeData.result[currentTestCase]?.stderr
                            .split("\n")
                            .map((line, index) => (
                              <div key={index}>{line}</div>
                            ))}
                    </div>
                  </div>
                )}
                <div className="my-2">
                  <div className="text-base">Input</div>
                  <div className="my-2 rounded bg-lightGray px-4 py-3 text-base">
                    {codeData.result[currentTestCase]?.input
                      ? codeData.result[currentTestCase].input
                          .split("\n")
                          .map((line, index) => <div key={index}>{line}</div>)
                      : "-"}
                  </div>
                </div>

                <div className="my-2">
                  <div className="text-base">Output</div>
                  <div className="my-2 rounded bg-lightGray px-4 py-3 text-base">
                    {codeData.result[currentTestCase]?.stdout
                      ? codeData.result[currentTestCase].stdout
                          .split("\n")
                          .map((line, index) => <div key={index}>{line}</div>)
                      : "-"}
                  </div>
                </div>

                <div className="my-2">
                  <div className="text-base">Expected Output</div>
                  <div className="my-2 rounded bg-lightGray px-4 py-3 text-base">
                    {codeData.result[currentTestCase]?.expected_output
                      ? codeData.result[currentTestCase].expected_output
                          .split("\n")
                          .map((line, index) => <div key={index}>{line}</div>)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
