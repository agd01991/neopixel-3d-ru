const events = [
    {},
    {},
    {}
]

export default function Table() {
    return (
        <div className="bg-[#171616]">
            <table className="table-fixed text-white border-collapse border border-slate-400  border-spacing-10">
                <thead>
                    <tr>
                        <th className="border border-slate-300">id</th>
                        <th className="border border-slate-300">order</th>
                        <th className="border border-slate-300">information</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((char, index) =>
                    <tr key={index}>
                        <td className="border border-slate-300">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td className="border border-slate-300">Malcolm Lockyer</td>
                        <td className="border border-slate-300">1961</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}


