import { me } from "@/api/me";
import { type dashboard, type profileData } from "@/schemas/api";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export default function Component({
  setProfile,
}: {
  setProfile: Dispatch<SetStateAction<profileData | undefined>>;
}) {
  const [data, setData] = useState<dashboard>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await me();
        setData(data);
        setProfile({
          username: data.username,
          round: data.round,
          score: data.score,
        });
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    void fetchData();
  }, [setProfile]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const hasRounds = data && Object.keys(data.submissions).length > 0;

  return (
    <div className="roboto relative ml-16 flex w-[60vw] flex-grow font-sans text-white">
      {/* Main Container */}
      <div className="flex flex-grow flex-col gap-6">
        {hasRounds ? (
          Object.keys(data.submissions).map((roundKey, i) => {
            const roundSubmissions = data.submissions[roundKey];
            return (
              <div
                key={i}
                className="relative h-32 flex-grow overflow-auto rounded-lg bg-[#2C2C2C] p-6 pt-0 shadow-lg"
              >
                {/* Round Header */}
                <div className="sticky top-0 -mx-6 flex items-center justify-between pt-6 backdrop-blur">
                  <h2 className="ml-6 font-mono text-3xl font-bold tracking-wider text-[#F14A16]">
                    ROUND {roundKey}
                  </h2>
                </div>

                {/* Questions for the current round */}
                <div className="mt-4 flex flex-col gap-4">
                  {roundSubmissions?.map((problem, i) => (
                    <div
                      key={i}
                      className="rounded-md bg-[#1F1F1F] px-6 py-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                    >
                      <div className="text-md font-mono text-[#F14A16]">
                        {problem.title}
                      </div>

                      {/* Description */}
                      <div className="flex-cols flex gap-10">
                        <p className="text-md text-[#B7AB98]">
                          {problem.description &&
                          problem.description.length > 50
                            ? `${problem.description.substring(0, 50)}...`
                            : problem.description}
                        </p>
                        <div className="text-md text-[#B7AB98]">
                          {"Your Score is:  " +
                            problem.score.toFixed(2) +
                            "/" +
                            problem.max_score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="s-sling mx-auto flex h-full w-fit items-center justify-center text-4xl font-bold text-[#B7AB98]">
            No Submissions Yet !
          </div>
        )}
      </div>
    </div>
  );
}
