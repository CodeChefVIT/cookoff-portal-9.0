import { type SubmitCodeWindowProps } from '@/schemas/api';
import React from 'react';

export default function SubmitCodeWindow({ taskres }: SubmitCodeWindowProps) {
  return (
    <div className="bg-black text-white p-6 rounded-md mx-auto mt-8 max-w-4xl">
      <h2 className="text-3xl font-semibold mb-3 text-accent s-sling text-left">Submission Result</h2>
      <table className="table-fixed w-full border-collapse">
  <thead>
    <tr>
      <th className="w-1/3 p-2 font-semibold text-left bg-lightGray border-b-2 border-white">Test Case</th>
      <th className="w-1/3 p-2 font-semibold text-left bg-lightGray border-b-2 border-white">Status</th>
      <th className="w-1/3 p-2 font-semibold text-left bg-lightGray border-b-2 border-white">Description</th>
    </tr>
  </thead>
  <tbody>
    {taskres.testcases.map((testcase, index) => (
      <tr key={testcase.testcase_id}>
        <td className={`p-2 bg-lightGray border-y-2 border-black ${testcase.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>{index + 1}</td>
        <td className={`p-2 bg-lightGray border-y-2 border-black ${testcase.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {testcase.status.charAt(0).toUpperCase() + testcase.status.slice(1)}
        </td>
        <td className={`p-2 bg-lightGray border-y-2 border-black ${testcase.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {testcase.description.charAt(0).toUpperCase() + testcase.description.slice(1)}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="mt-10 ">
        <h3 className="text-3xl font-semibold mb-2 text-accent s-sling">Baking Summary</h3>
        <div className='bg-lightGray grid w-1/2 divide-y-2 divide-black '>
        <p className="text-green-500 text-left flex  p-2 font-bold borber-b-1 border-black ">Testcases Passed: {taskres.testcases_passed}</p>
        <p className="text-red-500 text-left flex  p-2 font-bold ">Testcases Failed: {taskres.testcases_failed}</p>
        </div>
        
      </div>
    </div>
  );
}
