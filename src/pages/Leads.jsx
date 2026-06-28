import { useState, useEffect } from "react";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  // Load data from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem("leads");

    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      const defaultLeads = [
        {
          id: 1,
          name: "John",
          company: "ABC Ltd",
          status: "New",
        },
        {
          id: 2,
          name: "David",
          company: "XYZ Pvt Ltd",
          status: "Qualified",
        },
      ];

      setLeads(defaultLeads);

      // Save default data immediately
      localStorage.setItem("leads", JSON.stringify(defaultLeads));
    }
  }, []);

  // Save whenever leads change
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem("leads", JSON.stringify(leads));
    }
  }, [leads]);

  const addLead = () => {
    if (!name || !company || !status) {
      alert("Please fill all fields");
      return;
    }

    const newLead = {
      id: Date.now(),
      name,
      company,
      status,
    };

    setLeads([...leads, newLead]);

    setName("");
    setCompany("");
    setStatus("");
  };

  const editLead = (id) => {
    const newName = prompt("Enter new Lead Name");

    if (!newName) return;

    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, name: newName } : lead
      )
    );
  };

  const deleteLead = (id) => {
    if (window.confirm("Delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  const exportCSV = () => {
  if (leads.length === 0) {
    alert("No Leads Available");
    return;
  }

  const headers = ["ID", "Name", "Company", "Status"];

  const rows = leads.map((lead) => [
    lead.id,
    lead.name,
    lead.company,
    lead.status,
  ]);

  const csv =
    headers.join(",") +
    "\n" +
    rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Leads.csv";
  link.click();

  URL.revokeObjectURL(url);
};
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Leads Management</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Lead Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ padding: "10px" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">Select Stage</option>
          <option value="New">New</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal">Proposal</option>
          <option value="Won">Won</option>
        </select>

        <button
          onClick={addLead}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Lead
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Lead..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
        }}
      />

      <select
  value={filterStatus}
  onChange={(e) => setFilterStatus(e.target.value)}
  style={{
    padding: "10px",
    marginLeft: "10px",
    marginBottom: "20px",
  }}
>
  <option value="All">All Stages</option>
  <option value="New">New</option>
  <option value="Qualified">Qualified</option>
  <option value="Proposal">Proposal</option>
  <option value="Won">Won</option>
</select>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  }}
>
  <h3>Total Leads: {leads.length}</h3>

  <button
    onClick={exportCSV}
    style={{
      background: "#16a34a",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Export CSV
  </button>
</div>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads
            .filter((lead) =>
              lead.name.toLowerCase().includes(search.toLowerCase())
            )
            .filter((lead) =>
      filterStatus === "All"
        ? true
        : lead.status === filterStatus
    )
            .map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.company}</td>

                <td>{lead.status}</td>

                <td>
                  <button
                    onClick={() => editLead(lead.id)}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;