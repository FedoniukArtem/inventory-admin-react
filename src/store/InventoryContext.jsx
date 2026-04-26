import { createContext, useState, useContext, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    // Ініціалізація: відразу перевіряємо localStorage при створенні стейту 
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('mock_inventory');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await inventoryApi.getAll();
                // Оновлюємо стейт даними з нашого "фейкового" API (яке читає localStorage)
                if (res.data.data) {
                    setInventory(res.data.data);
                }
            } catch (err) {
                setError("Помилка завантаження даних");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <InventoryContext.Provider value={{
            inventory,
            setInventory,
            loading,
            error
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => useContext(InventoryContext);