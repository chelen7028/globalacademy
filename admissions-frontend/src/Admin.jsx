import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect if not logged in
    if (!token) {
      window.location.href = '/login.html';
      return;
    }

    fetchApps(statusFilter); // fetch only if logged in
  }, [statusFilter]);

  const fetchApps = async (status = '') => {
    const res = await fetch(`https://globalacademy.onrender.com/applications${status ? `?status=${status}` : ''}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await res.json();
    setApplications(data);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`https://globalacademy.onrender.com/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchApps(statusFilter);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

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

      <table className="w-full table-auto border-collapse border border-gray-300 text-xs">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Program</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Nationality</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Academic Term</th>
            <th className="border p-2">Academic Year</th>
            <th className="border p-2">English Test</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">GPA</th>
            <th className="border p-2">Transcript</th>
            <th className="border p-2">Test Result</th>
            <th className="border p-2">ID File</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Submitted</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="border p-2">{app.id}</td>
              <td className="border p-2">{app.program}</td>
              <td className="border p-2">{app.givenName} {app.familyName}</td>
              <td className="border p-2">{app.gender}</td>
              <td className="border p-2">{new Date(app.dob).toLocaleDateString()}</td>
              <td className="border p-2">{app.nationality}</td>
              <td className="border p-2">
                {app.streetAddress}, {app.city}, {app.stateProvince}, {app.country} {app.postalCode}
              </td>
              <td className="border p-2">{app.phone}</td>
              <td className="border p-2">{app.academicTerm}</td>
              <td className="border p-2">{app.academicYear}</td>
              <td className="border p-2">{app.other?.trim() ? app.other : app.englishTest}</td>
              <td className="border p-2">{app.testScore}</td>
              <td className="border p-2">{app.gpa}</td>
              <td className="border p-2">
                {app.transcriptFileName ? (
                  <a href={`https://globalacademy.onrender.com/uploads/${app.transcriptFileName}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">Transcript</a>
                ) : '—'}
              </td>
              <td className="border p-2">
                {app.testResultFileName ? (
                  <a href={`https://globalacademy.onrender.com/uploads/${app.testResultFileName}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">Test</a>
                ) : '—'}
              </td>
              <td className="border p-2">
                {app.idFileName ? (
                  <a href={`https://globalacademy.onrender.com/uploads/${app.idFileName}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">ID</a>
                ) : '—'}
              </td>
              <td className="border p-2 capitalize">{app.status}</td>
              <td className="border p-2">{new Date(app.submittedAt).toLocaleString()}</td>
              <td className="border p-2 space-y-1">
                <button
                  onClick={() => updateStatus(app.id, 'approved')}
                  className="bg-green-500 text-white px-2 py-1 rounded w-full"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full"
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
