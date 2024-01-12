
import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";

const ItemPage = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({
    name: "",
    price: 0,
    company: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editFormValues, setEditFormValues] = useState({
    name: "",
    price: 0,
    company: ""
  });
  

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("http://localhost:8080/api/stock")
      .then((response) => response.json())
      .then((data) => {
        setStocks(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleClick = (stockId) => {
    // Fetch the details of a specific stock based on its ID
    fetch(`http://localhost:8080/api/stock/${stockId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedStock(data); // Update selectedStock state with fetched stock details
        setIsEditing(false);

         // Set the form values for editing
         setEditFormValues({
          name: data.name,
          price: data.price,
          company: data.company
        });
      })
      .catch((error) => {
        console.error("Error fetching stock details:", error);
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
    setSelectedStock(null); // Clear selected stock
    setEditFormValues({
      name: "",
      price: 0,
      company: ""
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const numericPrice = parseFloat(editFormValues.price);
  
    if (isNaN(numericPrice)) {
      console.error("Invalid price value");
      return;
    }
  
    const stockWithoutQuotes = {
      name: editFormValues.name,
      price: numericPrice,
      company: editFormValues.company
    };
  
    fetch(`http://localhost:8080/api/stock/${selectedStock.stockid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stockWithoutQuotes)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update stock');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Stock updated:", data);
  
        // Fetch updated stock list
        fetch("http://localhost:8080/api/stock")
          .then((response) => response.json())
          .then((data) => {
            setStocks(data); // Update state with fetched data
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
        // Clear the form after successful update
        setEditFormValues({ name: "", price: 0, company: "" });
        setIsEditing(false); // Exit editing mode
        setSelectedStock(null); // Clear selected stock
      })
      .catch((error) => {
        console.error("Error updating stock:", error);
      });
  };
  
  const handleDelete = (stockId) => {
    // Send DELETE request to delete the stock item
    fetch(`http://localhost:8080/api/deletestock/${stockId}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete stock');
        }
        // Remove the deleted stock from the stocks list
        setStocks(stocks.filter((stock) => stock.stockid !== stockId));
        console.log("Stock deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting stock:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate input data
    if (newStock.name === "" || newStock.price <= 0 || newStock.company === "") {
      console.error("Invalid stock data");
      return;
    }
  
    // Convert price to a number explicitly
    const numericPrice = parseFloat(newStock.price);
  
    // Ensure numericPrice is a valid number
    if (isNaN(numericPrice)) {
      console.error("Invalid price value");
      return;
    }
  
    // Create a new stock object without quotation marks around price
    const stockWithoutQuotes = {
      name: newStock.name,
      price: numericPrice,
      company: newStock.company
    };
  
    // Send POST request to create a new stock
    fetch("http://localhost:8080/api/newstock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stockWithoutQuotes)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create stock');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful creation
        console.log("New stock created:", data);
  
        // Fetch updated stock list
        fetch("http://localhost:8080/api/stock")
          .then((response) => response.json())
          .then((data) => {
            setStocks(data); // Update state with fetched data
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
        // Clear the form after successful creation
        setNewStock({ name: "", price: 0, company: "" });
      })
      .catch((error) => {
        console.error("Error creating stock:", error);
      });
  };
  
  


  return (
    <DefaultLayout>
      <h1>Item List</h1>
      <div>
      {isEditing && selectedStock ? (
          <div>
            <h2>Edit Stock:</h2>
            <form>
              <label>
                Name:
                <input type="text" name="name" value={editFormValues.name} onChange={handleInputChange}
                />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={editFormValues.price} onChange={handleInputChange}
                />
              </label>
              <label>
                Company:
                <input type="text" name="company" value={editFormValues.company}onChange={handleInputChange}
                />
              </label>
              <button onClick={handleUpdate}>Update Stock</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </form>
          </div>
        ) : (
      <div>
        <h2>Add New Stock:</h2>
        <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={newStock.name}
        onChange={(event) =>
          setNewStock({ ...newStock, name: event.target.value })
        }
      />
    </label>
    <label>
      Price:
      <input
        type="number"
        name="price"
        value={newStock.price}
        onChange={(event) =>
          setNewStock({ ...newStock, price: event.target.value })
        }
      />
    </label>
    <label>
      Company:
      <input
        type="text"
        name="company"
        value={newStock.company}
        onChange={(event) =>
          setNewStock({ ...newStock, company: event.target.value })
        }
      />
    </label>
    <button type="submit">Add Stock</button>
  </form>

        <h2>All Stocks:</h2>
        <ul>
          {stocks.map((stock) => (
            <li key={stock.stockid} onClick={() => handleClick(stock.stockid)}>
              {/* Display basic stock details */}
              <p>Name: {stock.name}</p>
              <p>Price: {stock.price}</p>
              <p>Company: {stock.company}</p>
            </li>
          ))}
        </ul>
        {selectedStock && ( // Render selected stock details if available
          <div>
            <h2>Selected Stock Details:</h2>
            <p>Name: {selectedStock.name}</p>
            <p>Price: {selectedStock.price}</p>
            <p>Company: {selectedStock.company}</p>
            {/* Add more details as needed */}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(selectedStock.stockid)}>Delete</button>
          </div>
        )}
      </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ItemPage;
