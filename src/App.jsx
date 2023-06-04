import { useEffect, useState } from "react";
import "./App.css";
import Tab from "./components";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    return () => {};
  }, []);

  if (loading) {
    return (
      <section className="items-center">
        <h1 className="text-blue-400">Loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value];
  console.log(jobs);
  return (
    <section>
      <div className="items-center mx-auto flex flex-col py-10 space-y-3">
        <h1 className="text-black font-semibold text-4xl">Experience</h1>
        <div className="bg-green-400 w-48 h-1" />
      </div>
      <div className="flex flex-col lg:flex-row  space-x-4">
        <div className="max-w-[70px] pr-5">
          {jobs.map((item, index) => {
            return (
              <div key={index}>
                <button
                  type="button"
                  className={`border border-transparent hover:border-r-green-400 hover:text-green-500 hover:bg-green-50 p-2 ${
                    index === value && "text-green-500"
                  }`}
                  onClick={() => setValue(index)}
                >
                  {item.company}
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
          <h1 className="text-gray-500">{company}</h1>
          <h1 className="font-light text-sm pb-4">{dates}</h1>

          {duties.map((duty, index) => {
            return (
              <div key={index} className="py-5">
                <p>--{duty}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default App;
