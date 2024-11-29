import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Login from './components/Login';
import mood from './components/MoodTracker'
import logout from './components/Login'
import Register from './components/Register';
import ConditionsPage from './components/ConditionPage';
import ConditionDetails from './components/ConditionDetails';
import Home from './components/Home'; // Importa el componente Home
import conditionsData from './Data/MH-conditions'; // Importa el JSON
import MoodTracker from './components/MoodTracker';

function App() {
  const location = useLocation();

  // Función para obtener la condición específica por ID
  const getConditionById = (id) => {
    return conditionsData.find((condition) => condition.id === id);
  };

  // Rutas donde NO queremos mostrar el Navbar
  const hideNavbarRoutes = ['/login', '/register', '/logout'];

  

  return (
    <div>
      {/* Mostrar el Navbar solo si la ruta actual no está en hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Agregamos Home aquí */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mood" element={<MoodTracker />} />
        {/* Ruta para ConditionsPage */}
        <Route path="/conditions" element={<ConditionsPage conditions={conditionsData} />} />

        {/* Ruta para ConditionDetails */}
        <Route path="/condition/:id" element={<ConditionDetails />} />
      </Routes>
    </div>
  );
}

// Wrapper para usar useParams y filtrar los datos de la condición
const ConditionDetailWrapper = ({ getConditionById }) => {
  const { id } = useParams();
  const condition = getConditionById(id);

  if (!condition) {
    return <h2>Condition not found</h2>;
  }

  return <ConditionDetails condition={condition} />;
};



export default App;
