import { RoundBackgroundSVG, RoundHeaderSVG } from '../../assests/svgPaths';

// Simulated API response object
const roundData = {
  roundNumber: 1,
  problems: [
    { id: 1, title: "Maximise profit as a Salesman...", score: 8, maxScore: 10 },
    { id: 2, title: "Optimize warehouse logistics...", score: 7, maxScore: 10 },
    { id: 3, title: "Implement efficient routing...", score: 9, maxScore: 10 },
  ],
  totalScore: 80,
  solvedProblems: 8,
};

export default function Component() {
  return (
    <div className="text-white font-sans relative xl:ml-16 roboto w-full xl:w-[60vw] h-[321px]">
      <div className="absolute top-0 left-0 w-full z-10">
        <RoundHeaderSVG className="w-full" />
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 xl:px-6 h-[60px]">
          <h1 className="text-[#F14A16] text-3xl xl:text-5xl font-bold tracking-wider px-2 xl:px-5 s-sling">ROUND {roundData.roundNumber}</h1>
          <button className="text-viewSubmission text-sm xl:text-lg">View Submissions &gt;</button>
        </div>
      </div>

      <RoundBackgroundSVG className="absolute top-0 left-0 w-full" />

      <div className="absolute top-[72px] left-4 xl:left-6 right-4 xl:right-[200px] flex flex-col gap-4">
        {roundData.problems.map((problem) => (
          <div key={problem.id} className="flex justify-between items-center bg-[#2C2C2C] rounded-md py-2 xl:py-3 px-3 xl:px-4">
            <div className="text-base xl:text-lg text-[#B7AB98]">{problem.id}. {problem.title}</div>
            <div className="text-2xl xl:text-4xl font-bold text-white">{problem.score}<span className="text-xl xl:text-2xl">/{problem.maxScore}</span></div>
          </div>
        ))}
      </div>

      <div className="absolute right-4 xl:right-6 bottom-4 xl:bottom-6 flex flex-col items-end gap-4 xl:gap-8 mr-2 xl:mr-4 mb-3 xl:mb-6">
        <div className="flex flex-col items-center justify-center bg-transparent border-2 border-[#F14A16] rounded-3xl px-4 xl:px-6 py-1 xl:py-2 opacity-80">
          <div className="text-xs xl:text-sm">Score:</div>
          <div className="text-3xl xl:text-5xl font-bold">{roundData.totalScore}</div>
        </div>

        <div className="bg-[#484848] rounded-xl px-3 xl:px-4 py-1 xl:py-2 flex items-center gap-2">
          <span className="text-2xl xl:text-3xl font-bold">{roundData.solvedProblems}</span>
          <span className="text-xs xl:text-sm">Solved</span>
        </div>
      </div>
    </div>
  )
}