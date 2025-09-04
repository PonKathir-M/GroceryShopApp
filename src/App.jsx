import React, { useState, useEffect } from 'react';

// --- CSS Styles ---
// Using a component for styles to keep everything in one file without cluttering the main component.
const AppStyles = () => {
    const css = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        :root {
            --primary-color: #4CAF50;
            --primary-dark-color: #45a049;
            --secondary-color: #f1f1f1;
            --background-color: #f7f9fc;
            --text-color: #333;
            --border-color: #ddd;
            --danger-color: #f44336;
            --danger-dark-color: #e53935;
            --edit-color: #2196F3;
            --edit-dark-color: #1e88e5;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
        }

        .app-container {
            width: 100%;
            max-width: 600px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 20px var(--shadow-color);
            padding: 30px;
            box-sizing: border-box;
        }

        .app-header {
            text-align: center;
            margin-bottom: 25px;
        }

        .app-header h1 {
            color: var(--primary-color);
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .app-header p {
            margin: 5px 0 0;
            color: #777;
        }

        .form-container, .filter-container {
            margin-bottom: 20px;
        }

        .input-group {
            display: flex;
            gap: 10px;
        }

        .input-field {
            flex-grow: 1;
            padding: 12px;
            font-size: 1rem;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            transition: border-color 0.3s, box-shadow 0.3s;
        }

        .input-field:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }
        
        .quantity-field {
            width: 80px;
            flex-grow: 0;
        }

        .btn {
            padding: 12px 20px;
            font-size: 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.1s;
            font-weight: 500;
        }
        
        .btn:active {
             transform: translateY(1px);
        }

        .btn-add {
            background-color: var(--primary-color);
            color: white;
            flex-shrink: 0;
        }

        .btn-add:hover {
            background-color: var(--primary-dark-color);
        }
        
        .list-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .btn-clear {
            background-color: var(--danger-color);
            color: white;
        }

        .btn-clear:hover {
            background-color: var(--danger-dark-color);
        }


        .grocery-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        
        .list-empty-message {
            text-align: center;
            padding: 20px;
            color: #999;
            background-color: var(--secondary-color);
            border-radius: 8px;
        }

        .grocery-item {
            display: flex;
            align-items: center;
            padding: 15px;
            background: #fff;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin-bottom: 10px;
            transition: background-color 0.3s, box-shadow 0.3s;
        }
        
        .grocery-item:hover {
            box-shadow: 0 2px 10px var(--shadow-color);
        }

        .grocery-item.purchased {
            background-color: #e8f5e9;
        }
        
        .item-info {
            flex-grow: 1;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .item-info.purchased .item-name {
            text-decoration: line-through;
            color: #888;
        }

        .item-name {
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .item-quantity {
            margin-left: 10px;
            font-size: 0.9rem;
            background-color: var(--secondary-color);
            color: #555;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .item-actions {
            display: flex;
            gap: 8px;
        }
        
        .btn-icon {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            font-size: 1.2rem;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }
        
        .btn-edit {
            color: var(--edit-color);
        }
        .btn-edit:hover {
            background-color: #e3f2fd;
        }
        
        .btn-delete {
            color: var(--danger-color);
        }
        .btn-delete:hover {
            background-color: #ffebee;
        }
        
        .edit-form {
            flex-grow: 1;
            display: flex;
            gap: 10px;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .app-container {
                padding: 20px;
            }

            .app-header h1 {
                font-size: 2rem;
            }

            .input-group {
                flex-direction: column;
            }
            
            .quantity-field {
                width: 100%;
            }
            
            .list-controls {
                flex-direction: column;
                gap: 10px;
                align-items: stretch;
            }
            
            .filter-container input, .list-controls .btn {
                width: 100%;
                box-sizing: border-box;
            }
            
            .grocery-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .item-actions {
                width: 100%;
                justify-content: flex-end;
            }
        }
    `;
    return <style>{css}</style>;
};


// --- Main App Component ---
function App() {
    // --- State Variables ---
    const [items, setItems] = useState(() => {
        // Load items from localStorage on initial render
        const savedItems = localStorage.getItem('groceryItems');
        return savedItems ? JSON.parse(savedItems) : [
            { id: 1, name: 'Milk', quantity: '1 Gallon', purchased: false },
            { id: 2, name: 'Bread', quantity: '2 Loaves', purchased: false },
            { id: 3, name: 'Eggs', quantity: '1 Dozen', purchased: true },
        ];
    });
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('1');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingQuantity, setEditingQuantity] = useState('');

    // --- Effects ---
    // Save items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('groceryItems', JSON.stringify(items));
    }, [items]);

    // --- Event Handlers ---
    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItemName.trim()) return; // Prevent adding empty items
        const newItem = {
            id: Date.now(),
            name: newItemName.trim(),
            quantity: newItemQuantity.trim() || '1',
            purchased: false,
        };
        setItems([newItem, ...items]);
        setNewItemName('');
        setNewItemQuantity('1');
    };

    const handleTogglePurchased = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, purchased: !item.purchased } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };
    
    const handleStartEditing = (item) => {
        setEditingId(item.id);
        setEditingName(item.name);
        setEditingQuantity(item.quantity);
    };
    
    const handleCancelEditing = () => {
        setEditingId(null);
    };

    const handleUpdateItem = (e) => {
        e.preventDefault();
        setItems(items.map(item =>
            item.id === editingId ? { ...item, name: editingName, quantity: editingQuantity } : item
        ));
        setEditingId(null);
    };
    
    const handleClearList = () => {
        if (window.confirm('Are you sure you want to clear the entire list?')) {
             setItems([]);
        }
    }

    // --- Derived State ---
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Render ---
    return (
        <>
            <AppStyles />
            <div className="app-container">
                <header className="app-header">
                    <h1>Grocery List</h1>
                    <p>Plan your shopping with ease</p>
                </header>

                {/* Add Item Form */}
                <div className="form-container">
                    <form onSubmit={handleAddItem}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g., Apples"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="input-field quantity-field"
                                placeholder="e.g., 1kg"
                                value={newItemQuantity}
                                onChange={(e) => setNewItemQuantity(e.target.value)}
                            />
                            <button type="submit" className="btn btn-add">Add Item</button>
                        </div>
                    </form>
                </div>
                
                {/* List Controls (Filter and Clear) */}
                {items.length > 0 && (
                    <div className="list-controls">
                        <div className="filter-container">
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Search for an item..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button onClick={handleClearList} className="btn btn-clear">Clear All</button>
                    </div>
                )}


                {/* Grocery List */}
                <ul className="grocery-list">
                    {filteredItems.length === 0 ? (
                        <p className="list-empty-message">Your grocery list is empty. Add an item to get started!</p>
                    ) : (
                        filteredItems.map(item => (
                            <li key={item.id} className={`grocery-item ${item.purchased ? 'purchased' : ''}`}>
                                {editingId === item.id ? (
                                    // Editing View
                                    <form onSubmit={handleUpdateItem} className="edit-form">
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="input-field quantity-field"
                                            value={editingQuantity}
                                            onChange={(e) => setEditingQuantity(e.target.value)}
                                        />
                                        <button type="submit" className="btn btn-add">Save</button>
                                        <button type="button" onClick={handleCancelEditing} className="btn btn-clear">Cancel</button>
                                    </form>
                                ) : (
                                    // Default View
                                    <>
                                        <div className={`item-info ${item.purchased ? 'purchased' : ''}`} onClick={() => handleTogglePurchased(item.id)}>
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">{item.quantity}</span>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handleStartEditing(item)} className="btn-icon btn-edit" title="Edit">✏️</button>
                                            <button onClick={() => handleRemoveItem(item.id)} className="btn-icon btn-delete" title="Delete">🗑️</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}

export default App;