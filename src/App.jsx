import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//Лабораторна 7 (адмінка)
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

//Лабораторна 8 (клієнтська частина)
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />

            <div className="container">
                <Routes>

                  
                    <Route path="/" element={<Gallery />} />
                    <Route path="/favorites" element={<Favorites />} />

                 
                    <Route path="/admin" element={<AdminInventory />} />
                    <Route path="/admin/create" element={<AdminInventoryCreate />} />
                    <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
                    <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />

                    {/* ❗ запасний редірект (якщо неправильний шлях) */}
                    <Route path="*" element={<Navigate to="/" />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;