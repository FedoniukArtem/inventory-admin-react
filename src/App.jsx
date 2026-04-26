import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/admin" />} />

                    <Route path="/admin" element={<AdminInventory />} />
                    <Route path="/admin/create" element={<AdminInventoryCreate />} />
                    <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
                    <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;