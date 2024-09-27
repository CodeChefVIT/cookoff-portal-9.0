import { type SubmitCodeWindowProps } from '@/schemas/api';
import React from 'react';



export default function SubmitCodeWindow({taskres}: SubmitCodeWindowProps) {
  
  return (
    <div className="bg-black text-white p-6 rounded-md mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-3 text-accent text-left">Submission Result</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="font-semibold text-left text-xl mb-1">Test Case</div>
        <div className="font-semibold text-left text-xl mb-1">Status</div>
        <div className="font-semibold text-left text-xl mb-1">Description</div>
        {taskres.testcases.map((testcase, index) => (
          <React.Fragment key={testcase.testcase_id}>
            <div className={`${testcase.status === 'success' ? 'text-green-500' : 'text-red-500'} text-left font-bold`}>
              {index + 1}
            </div>
            <div className={`${testcase.status === 'success' ? 'text-green-500' : 'text-red-500'} text-left font-bold`}>
              {testcase.status}
            </div>
            <div className={`${testcase.status === 'success' ? 'text-green-500' : 'text-red-500'} text-left font-bold`}>
              {testcase.description}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-10 text-left">
        <h3 className="text-3xl font-semibold mb-2 text-accent">Baking Summary</h3>
        <p className='text-green-500 text-left font-bold mb-2'>Testcases Passed: {taskres.testcases_passed}</p>
        <p className='text-red-500 text-left font-bold'>Testcases Failed: {taskres.testcases_failed}</p>
      </div>
    </div>
  );
};


