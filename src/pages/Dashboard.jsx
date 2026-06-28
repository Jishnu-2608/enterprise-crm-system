import { useEffect, useState } from "react";

function Dashboard() {
  const [leadCount, setLeadCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [wonDeals, setWonDeals] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const leads = JSON.parse(localStorage.getItem("leads")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    setLeadCount(leads.length);
    setCustomerCount(customers.length);

    // Count Won Deals
    const won = leads.filter(
      (lead) => lead.status === "Won"
    ).length;

    setWonDeals(won);

    // Demo Revenue (₹50,000 per Won Deal)
    setRevenue(won * 50000);
  }, []);

  return (
    <div>
      <h1>CRM Dashboard</h1>

      <div className="card-grid">
        <div className="card blue">
          <h3>Total Leads</h3>
          <h1>{leadCount}</h1>
        </div>

        <div className="card green">
          <h3>Total Customers</h3>
          <h1>{customerCount}</h1>
        </div>

        <div className="card orange">
          <h3>Revenue</h3>
          <h1>₹{revenue.toLocaleString()}</h1>
        </div>

        <div className="card red">
          <h3>Deals Won</h3>
          <h1>{wonDeals}</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Recent Activity
        </h2>

        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>New Lead Added</td>
              <td style={{ color: "green" }}>
                Completed
              </td>
              <td>Today</td>
            </tr>

            <tr>
              <td>Customer Registered</td>
              <td style={{ color: "blue" }}>
                Completed
              </td>
              <td>Today</td>
            </tr>

            <tr>
              <td>Proposal Sent</td>
              <td style={{ color: "orange" }}>
                Pending
              </td>
              <td>Yesterday</td>
            </tr>

            <tr>
              <td>Deal Closed</td>
              <td style={{ color: "green" }}>
                Won
              </td>
              <td>2 Days Ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;