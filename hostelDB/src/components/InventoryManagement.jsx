import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
    status: 'Available',
  });

  useEffect(() => {
    // Fetch inventory items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/inventory', newItem);
      setItems([...items, response.data]);
      setNewItem({
        name: '',
        category: '',
        quantity: '',
        status: 'Available',
      });
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/inventory/${id}`, { status });
      setItems(items.map(item => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error('Error updating inventory item status:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Inventory Management</h1>
      
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Item</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <button
          onClick={handleAddItem}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Add Item
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Inventory List</h2>
        <ul className="list-disc list-inside mt-4">
          {items.map(item => (
            <li key={item._id} className="mt-2">
              {item.name} - {item.category} - Quantity: {item.quantity} - Status: {item.status}
              <button
                onClick={() => handleStatusChange(item._id, 'Out of Stock')}
                className="ml-4 p-2 bg-red-600 text-white rounded"
              >
                Mark as Out of Stock
              </button>
              <button
                onClick={() => handleStatusChange(item._id, 'Available')}
                className="ml-4 p-2 bg-green-600 text-white rounded"
              >
                Mark as Available
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryManagement;
