import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/jobs"
            );

            setJobs(res.data.jobs || []);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                Latest Jobs

            </h2>

            {

                jobs.length === 0 ? (

                    <p className="text-gray-500">

                        No Jobs Found

                    </p>

                ) : (

                    jobs.slice(0,5).map((job,index)=>(

                        <div
                            key={index}
                            className="border rounded-xl p-4 mb-4 hover:shadow-lg transition"
                        >

                            <h3 className="font-bold text-lg">

                                {job.title}

                            </h3>

                            <p className="text-gray-500">

                                {job.company}

                            </p>

                            <div className="mt-3 flex justify-between">

                                <span className="text-cyan-600 font-semibold">

                                    {job.salary}

                                </span>

                                <span>

                                    {job.location}

                                </span>

                            </div>

                        </div>

                    ))

                )

            }

        </div>

    );

}