import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Імпортуємо провайдер зі стору 
import { InventoryProvider } from './store/InventoryContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Огортаємо додаток, щоб Context був доступний у всіх компонентах */}
        <InventoryProvider>
            <App />
        </InventoryProvider>
    </StrictMode>,
)