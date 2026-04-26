import { createContext, useState, useContext, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refreshInventory = async () => {
        setLoading(true);
        try {
            const res = await inventoryApi.getAll();
            setInventory(res.data.data);
        } catch (err) {
            setError("Помилка завантаження");
        } finally {
            setLoading(false);
        }
    };

    return (
        <InventoryContext.Provider value={{ 
            inventory, setInventory, loading, error, refreshInventory 
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => useContext(InventoryContext);