import useUsers from "../hooks/useUsers";

export default function RecentUsers() {

    const { users } = useUsers();

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                Recent Users

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-left border-b">

                        <th className="pb-3">Name</th>

                        <th>Email</th>

                        <th>Experience</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.slice(0,5).map((user,index)=>(

                            <tr
                                key={index}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="py-4 font-semibold">

                                    {user.name}

                                </td>

                                <td>

                                    {user.email}

                                </td>

                                <td>

                                    {user.experience}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}