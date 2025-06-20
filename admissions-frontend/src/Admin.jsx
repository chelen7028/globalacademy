import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchApps = async (status = '') => {
    const res = await fetch(`http://localhost:4000/applications${status ? `?status=${status}` : ''}`);
    const data = await res.json();
    setApplications(data);
  };

  useEffect(() => {
    fetchApps(statusFilter);
  }, [statusFilter]);

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:4000/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchApps(statusFilter);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/applications/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchApplications(); // refresh list
      } else {
        alert('Failed to delete application');
      }
    } catch {
      alert('Error deleting application');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">GPA</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">ID File</th>
            <th className="border p-2">Submitted At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="border p-2">{app.id}</td>
              <td className="border p-2">{app.name}</td>
              <td className="border p-2">{app.email}</td>
              <td className="border p-2">{app.gpa}</td>
              <td className="border p-2 capitalize">{app.status}</td>
              <td className="border p-2">
                {app.idFileName ? (
                  <a
                    href={`http://localhost:4000/uploads/${app.idFileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View File
                  </a>
                ) : 'No file'}
              </td>
              <td className="border p-2">{new Date(app.submittedAt).toLocaleString()}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => updateStatus(app.id, 'approved')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
