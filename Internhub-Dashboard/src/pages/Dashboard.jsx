import { useEffect, useState } from "react";
import candidatesData from "../data/candidates";
import internshipsData from "../data/internships";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [openInternships, setOpenInternships] = useState(0);
  const [closedInternships, setClosedInternships] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);

  useEffect(() => {
    setApprovedCount(
      candidatesData.filter((c) => c.status === "Approved").length
    );
    setPendingCount(
      candidatesData.filter((c) => c.status === "Pending").length
    );
    setOpenInternships(
      internshipsData.filter((i) => i.status === "Open").length
    );
    setClosedInternships(
      internshipsData.filter((i) => i.status === "Closed").length
    );
    setTotalCandidates(candidatesData.length);
  }, []);

  const chartData = Object.entries(
    candidatesData.reduce((acc, cur) => {
      acc[cur.internship] = (acc[cur.internship] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, applicants]) => ({ name, applicants }))
    .sort((a, b) => b.applicants - a.applicants)
    .slice(0, 5);

  const stats = [
    {
      title: "Total Candidates",
      value: totalCandidates,
      growth: "+20 new candidates",
      growthColor: "text-blue-600",
    },
    {
      title: "Approved Candidates",
      value: approvedCount,
      growth: "+12% from last month",
      growthColor: "text-green-600",
    },
    {
      title: "Pending Candidates",
      value: pendingCount,
      growth: "-5% from last month",
      growthColor: "text-red-500",
    },
    {
      title: "Open Internships",
      value: openInternships,
      growth: "+8% from last month",
      growthColor: "text-green-600",
    },
    {
      title: "Closed Internships",
      value: closedInternships,
      growth: "+3% from last month",
      growthColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8 px-6 py-4 bg-[#F9FAFB] min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-[#000000] mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">
          Welcome! Let's take a quick look at your internship programs!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            growthColor={stat.growthColor}
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-sm font-semibold text-[#F59E0B] mb-2">
          Top 5 Internships by Applicants
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 10 }}
              domain={[0, "dataMax + 1"]}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) =>
                String(value)
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/([A-Z]+)/g, (match) => match.toUpperCase())
              }
            />
            <Tooltip />
            <Bar dataKey="applicants" fill="#F59E0B" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}