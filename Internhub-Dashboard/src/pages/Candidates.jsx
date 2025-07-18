import { useState, useEffect } from "react";
import { getCandidates } from "../api/candidates"; 
import StatusTag from "../components/StatusTag";
import FormField from "../components/FormField";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import SortIcon from "../components/SortIcon";
import Button from "../components/Button";

export default function Candidates() {
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    internship: "",
    status: "Pending",
  });

  useEffect(() => {
    getCandidates().then((data) => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filtered = [...candidates]
    .filter((c) =>
      (c.name + c.internship + c.email)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() || "";
      const valB = b[sortKey]?.toLowerCase?.() || "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleAddCandidate = () => {
    const { name, email, internship, status } = formData;
    if (!name || !email || !internship || !status) return;

    const newCandidate = {
      id: Date.now(),
      ...formData,
    };

    setCandidates([newCandidate, ...candidates]);
    setFormData({
      name: "",
      email: "",
      internship: "",
      status: "Pending",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#000000]">Candidates</h1>

        <div className="flex flex-1 sm:flex-none gap-3">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or internship..."
          />
          <Button onClick={() => setIsModalOpen(true)} className="text-sm whitespace-nowrap">
            + Add Candidate
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F3F4F6]">
              <tr>
                {["name", "email", "internship", "status"].map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center gap-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <SortIcon direction={sortKey === key ? sortOrder : undefined} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                filtered.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{candidate.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{candidate.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{candidate.internship}</td>
                    <td className="px-6 py-4">
                      <StatusTag status={candidate.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <Modal
          title="Add New Candidate"
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddCandidate}
        >
          <form className="space-y-3">
            <FormField label="Name">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormField>

            <FormField label="Internship">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.internship}
                onChange={(e) => setFormData({ ...formData, internship: e.target.value })}
              />
            </FormField>

            <FormField label="Status">
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </FormField>
          </form>
        </Modal>
      )}
    </div>
  );
}