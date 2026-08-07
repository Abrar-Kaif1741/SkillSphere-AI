import { useEffect, useState } from "react";
import axios from "axios";

export default function RecommendationPanel() {

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {

        fetchRecommendations();

    }, []);

    async function fetchRecommendations() {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/recommendations/jobs/1"

            );

            setRecommendations(

                res.data.recommendations || []

            );

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                AI Recommendations

            </h2>

            {

                recommendations.length===0 ?

                (

                    <div className="text-gray-500">

                        No Recommendations Available

                    </div>

                )

                :

                recommendations.map((job,index)=>(

                    <div
                        key={index}
                        className="border rounded-xl p-5 mb-5 hover:shadow-xl transition"
                    >

                        <h3 className="text-xl font-bold">

                            {job.title}

                        </h3>

                        <p className="text-gray-500">

                            {job.company}

                        </p>

                        <div className="mt-4 flex justify-between">

                            <span className="font-semibold text-green-600">

                                {job.salary}

                            </span>

                            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg">

                                View

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}