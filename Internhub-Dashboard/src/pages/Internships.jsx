import { useEffect, useState } from "react";
import { getInternships } from "../api/internships"; 
import StatusTag from "../components/StatusTag";
import FormField from "../components/FormField";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import Button from "../components/Button";

export default function Internships() {
  const [search, setSearch] = useState("");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    duration: "",
    stipend: "",
    status: "Open",
  });

  useEffect(() => {
    getInternships().then((data) => {
      setInternships(data);
      setLoading(false);
    });
  }, []);

  const filtered = internships.filter((internship) =>
    (internship.title + internship.department)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAddInternship = (e) => {
    e.preventDefault();
    const { title, department, duration, stipend, status } = formData;
    if (!title || !department || !duration || !stipend || !status) return;

    const newInternship = {
      id: Date.now(),
      ...formData,
    };

    setInternships([newInternship, ...internships]);
    setFormData({
      title: "",
      description: "",
      department: "",
      duration: "",
      stipend: "",
      status: "Open",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex justify-between items-center flex-col sm:flex-row mb-6 gap-3">
        <div className="flex flex-col w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-[#000000] mb-1">Internships</h1>
          <p className="text-sm text-gray-600">Manage and post internship opportunities</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or department..."
            className="mb-4"
          />
          <Button onClick={() => setIsModalOpen(true)}>+ Post Internship</Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading internships...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No internships found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((internship) => (
            <div
              key={internship.id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {internship.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{internship.department}</p>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Duration:</span> {internship.duration}</p>
                  <p><span className="font-medium">Stipend:</span> {internship.stipend}</p>
                </div>
              </div>
              <div className="mt-4">
                <StatusTag status={internship.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal
          title="Post New Internship"
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddInternship}
        >
          <form onSubmit={handleAddInternship} className="space-y-3">
            <FormField label="Title">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </FormField>

            <FormField label="Description">
              <textarea
                rows="2"
                className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </FormField>

            <FormField label="Department">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </FormField>

            <FormField label="Duration (weeks)">
              <input
                type="text"
                placeholder="e.g. 6 weeks"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </FormField>

            <FormField label="Stipend">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              />
            </FormField>

            <FormField label="Status">
              <select
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Open</option>
                <option>Closed</option>
              </select>
            </FormField>
          </form>
        </Modal>
      )}
    </div>
  );
}