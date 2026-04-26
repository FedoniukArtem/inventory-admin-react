import { createContext, useState, useContext, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('mock_inventory');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    // ВАЖЛИВО: setLoading(false) за замовчуванням, 
    // щоб не блокувати рендер вже наявних у localStorage даних
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = async (silent = false) => {
        // Якщо silent = true, ми оновлюємо дані у фоні, не показуючи "Завантаження..."
        if (!silent) setLoading(true);
        try {
            const res = await inventoryApi.getAll();
            if (res.data.data) {
                setInventory(res.data.data);
                // Оновлюємо localStorage, щоб дані завжди були свіжі
                localStorage.setItem('mock_inventory', JSON.stringify(res.data.data));
            }
        } catch (err) {
            setError("Помилка завантаження даних");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Викликаємо завантаження у фоновому режимі (silent), 
        // оскільки початкові дані ми вже взяли з localStorage у useState
        loadData(inventory.length === 0 ? false : true);
    }, []);

    return (
        <InventoryContext.Provider value={{
            inventory,
            setInventory,
            loading,
            error,
            refreshInventory: loadData // Додаємо функцію для ручного оновлення
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => useContext(InventoryContext);