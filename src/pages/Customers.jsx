import { useState, useEffect } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  // Load customers from localStorage
  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");

    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      const defaultCustomers = [
        {
          id: 1,
          name: "Ramesh",
          company: "Tech Solutions",
          email: "ramesh@gmail.com",
        },
        {
          id: 2,
          name: "Suresh",
          company: "ABC Pvt Ltd",
          email: "suresh@gmail.com",
        },
      ];

      setCustomers(defaultCustomers);
      localStorage.setItem(
        "customers",
        JSON.stringify(defaultCustomers)
      );
    }
  }, []);

  // Save customers whenever data changes
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem(
        "customers",
        JSON.stringify(customers)
      );
    }
  }, [customers]);

  const addCustomer = () => {
    if (!name || !company || !email) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      company,
      email,
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setCompany("");
    setEmail("");
  };

  const editCustomer = (id) => {
    const newName = prompt("Enter new Customer Name");

    if (!newName) return;

    setCustomers(
      customers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              name: newName,
            }
          : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    setCustomers(
      customers.filter(
        (customer) => customer.id !== id
      )
    );
  };

  const exportCSV = () => {
  if (customers.length === 0) {
    alert("No Customers Available");
    return;
  }

  const headers = ["ID", "Name", "Company", "Email"];

  const rows = customers.map((customer) => [
    customer.id,
    customer.name,
    customer.company,
    customer.email,
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
  link.download = "Customers.csv";
  link.click();

  URL.revokeObjectURL(url);
};


  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>
        Customers Management
      </h1>

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
          placeholder="Customer Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          style={{ padding: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{ padding: "10px" }}
        />

        <button
          onClick={addCustomer}
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Customer
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "15px",
        }}
      />

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  }}
>
  <h3>Total Customers: {customers.length}</h3>

  <button
    onClick={exportCSV}
    style={{
      backgroundColor: "#16a34a",
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
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers
            .filter((customer) =>
              customer.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.company}</td>
                <td>{customer.email}</td>

                <td>
                  <button
                    onClick={() =>
                      editCustomer(customer.id)
                    }
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCustomer(customer.id)
                    }
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
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

export default Customers;