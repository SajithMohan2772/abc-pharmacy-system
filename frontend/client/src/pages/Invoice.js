import React, { useState, useEffect } from 'react';
import DefaultLayout from "../components/DefaultLayout";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    name: "",
    address: "",
    email: "",
    mobileNo: "",
    billingType: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editFormValues, setEditFormValues] = useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
    billingType:""
  });
 
// invoice

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("http://localhost:8080/api/invoice")
      .then((response) => response.json())
      .then((data) => {
        setInvoices(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (invoiceId) => {
    // Fetch the details of a specific invoice based on its ID
    fetch(`http://localhost:8080/api/invoice/${invoiceId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedInvoice(data); // Update setSelectedInvoice state with fetched invoice details
        setIsEditing(false);

         // Set the form values for editing
         setEditFormValues({
          name: data.name,
          email: data.email,
          address: data.address,
          mobileNo: data.mobileNo,
          billingType: data.billingType

        });
      })
      .catch((error) => {
        console.error("Error fetching invoice details:", error);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormValues({ ...editFormValues, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false); // Disable editing mode
    setSelectedInvoice(null); // Clear selected invoice
    setEditFormValues({
      name: "",
      email: "",
      address: "",
      mobileNo: "",
      billingType: ""
    });
  };
 
  const handleUpdate = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
  
    const invoiceWithoutQuotes = {
      name: editFormValues.name,
      email: editFormValues.email,
      address: editFormValues.address,
      mobileNo: editFormValues.mobileNo,
      billingType: editFormValues.billingType

    };
  
    fetch(`http://localhost:8080/api/invoice/${selectedInvoice.invoiceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invoiceWithoutQuotes)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update invoice');
        }
        return response.json();
      })
      .then((data) => {
        console.log("invoice updated:", data);
  
        // Fetch updated invoice list
        fetch("http://localhost:8080/api/invoice")
          .then((response) => response.json())
          .then((data) => {
            setInvoices(data); // Update state with fetched data
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
        // Clear the form after successful update
        setEditFormValues({ name: "", email:"" , address: "", mobileNo:"", billingType: "" });
        setIsEditing(false); // Exit editing mode
        setSelectedInvoice(null); // Clear selected invoice
      })
      .catch((error) => {
        console.error("Error updating invoice:", error);
      });
  }; 

  const handleDelete =  (invoiceID) => {
    fetch(`http://localhost:8080/api/deletesinvoice/${invoiceID}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete invoice');
        }
        // Remove the deleted invoice from the invoices list
        setInvoices(Invoice.filter((invoice) => invoice.invoiceID !== invoiceID));
        console.log("invoice deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting invoice:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate input data
    if (newInvoice.name === "" || newInvoice.email === "" || newInvoice.address === "" || newInvoice.mobileNo === ""|| newInvoice.billingType === "") {
      console.error("Invalid invoice data");
      return;
    }
  
    // Create a new invoice object without quotation marks around price
    const invoiceWithoutQuotes = {
        name: newInvoice.name,
        email: newInvoice.email,
        address: newInvoice.address,
        mobileNo: newInvoice.mobileNo,
        billingType: newInvoice.billingType
    };

    console.log(JSON.stringify(invoiceWithoutQuotes))
  
    // Send POST request to create a new invoice
    fetch("http://localhost:8080/api/newinvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invoiceWithoutQuotes)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Invoice');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful creation
        console.log("New Invoice created:", data);
  
        // Fetch updated invoice list
        fetch("http://localhost:8080/api/invoice")
          .then((response) => response.json())
          .then((data) => {
            setInvoices(data); // Update state with fetched data
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
        // Clear the form after successful creation
        setNewInvoice({ name: "", email:"" , address: "", mobileNo:"",billingType: "" });
      })
      .catch((error) => {
        console.error("Error creating invoice:", error);
      });
  };

  return (
    <DefaultLayout>
      <h1>invoice List</h1>
      <div>
      {isEditing && selectedInvoice ? (
          <div>
            <h2>Edit invoice:</h2>
            <form>
              <label>
                Name:
                <input type="text" name="name" value={newInvoice.name} onChange={handleInputChange}  />
              </label>
              <label>
                Email:
                <input type="text" name="email" value={newInvoice.email} onChange={handleInputChange} />
                </label>
              <label>
               Address:
               <input type="text" name="address" value={newInvoice.address} onChange={handleInputChange}  />
              </label>
              <label>
               mobileNo:
               <input type="text" name="mobileNo" value={newInvoice.mobileNo} onChange={handleInputChange} />
              </label>
              <label>
               billingType:
               <input type="text" name="billingType" value={newInvoice.billingType} onChange={handleInputChange} />
              </label>
              <button onClick={handleUpdate}>Update invoice</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </form>
          </div>
        ) : (
      <div>
        <h2>Add New Invoice:</h2>
        <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={newInvoice.name}
        onChange={(event) =>
          setNewInvoice({ ...newInvoice, name: event.target.value })
        }
      />
    </label>
    <label>
      Email:
      <input
        type="email" name="email" value={newInvoice.email} onChange={(event) =>
          setNewInvoice({ ...newInvoice, email: event.target.value })
        }
      />
    </label>
    <label>
      Address:
      <input
        type="text"
        name="Address"
        value={newInvoice.address}
        onChange={(event) =>
          setNewInvoice({ ...newInvoice, address: event.target.value })
        }
      />
    </label>
    <label>
      MobileNo:
      <input
        type="text"
        name="MobileNo"
        value={newInvoice.mobileNo}
        onChange={(event) =>
          setNewInvoice({ ...newInvoice, mobileNo: event.target.value })
        }
      />
    </label>
    <label>
      BillingType:
      <input
        type="text"
        name="BillingType"
        value={newInvoice.billingType}
        onChange={(event) =>
          setNewInvoice({ ...newInvoice, billingType: event.target.value })
        }
      />
    </label>
    <button type="submit">Add Invoice</button>
  </form>

        <h2>All Invoices:</h2>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.invoiceID} onClick={() => handleClick(invoice.invoiceID)}>
              {/* Display basic invoice details */}
              <p>Name: {invoice.name}</p>
              <p>Email: {invoice.email}</p>
              <p>Address: {invoice.address}</p>
              <p>BillingType: {invoice.billingType}</p>
              <p>MobileNo: {invoice.mobileNo}</p>
            </li>
          ))}
        </ul>
        {selectedInvoice && ( // Render selected invoice details if available
          <div>
            <h2>Selected invoice Details:</h2>
            <p>Name: {selectedInvoice.name}</p>
            <p>Email: {selectedInvoice.email}</p>
            <p>Address: {selectedInvoice.address}</p>
            <p>BillingType: {selectedInvoice.billingType}</p>
              <p>MobileNo: {selectedInvoice.mobileNo}</p>
            {/* Add more details as needed */}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(selectedInvoice.invoiceID)}>Delete</button>
          </div>
        )}
      </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Invoice;