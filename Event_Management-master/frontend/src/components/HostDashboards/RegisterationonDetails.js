import React, { useState } from 'react';
import './RegistrationDetails.css';

const mockRegistrations = [
  {
    id: 1,
    name: "Aarav Mehta",
    event: "TechCon 2025",
    date: "2025-05-10",
    status: "pending",
  },
  {
    id: 2,
    name: "Sara Khan",
    event: "Design Fest",
    date: "2025-06-01",
    status: "accepted",
  },
];

const RegistrationDetails = () => {
  const [registrations, setRegistrations] = useState(mockRegistrations);

  const handleAction = (id, action) => {
    const updated = registrations.map((reg) =>
      reg.id === id ? { ...reg, status: action } : reg
    );
    setRegistrations(updated);
    alert(`Participant ${action === "accepted" ? "accepted" : "rejected"}`);
  };

  const issueCertificate = (name) => {
    if (window.confirm(`Issue certificate to ${name}?`)) {
      alert("Certificate issued.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
            <th>Certificate</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg.id}>
              <td>{reg.name}</td>
              <td>{reg.event}</td>
              <td>{reg.date}</td>
              <td>{reg.status}</td>
              <td>
                <button onClick={() => handleAction(reg.id, "accepted")}>Accept</button>
                <button onClick={() => handleAction(reg.id, "rejected")}>Reject</button>
              </td>
              <td>
                {reg.status === "accepted" ? (
                  <button onClick={() => issueCertificate(reg.name)}>Issue</button>
                ) : (
                  <button disabled>Issue</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationDetails;
