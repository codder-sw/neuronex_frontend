import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Medications from './pages/Medications';
import Trends from './pages/Trends';
import Vault from './pages/Vault';
import Remedies from './pages/Remedies';
import Caretaker from './pages/Caretaker';
import Login from './pages/Login';

function App() {
  const [userRole, setUserRole] = useState(null); 
  const [activePage, setActivePage] = useState('Overview');

  // 💊 1. MASTER DATA: Dawaiyon ki list yahan banayi (Central Store)
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Thyronorm (Thyroid)", time: "07:00 AM", status: "Pending" },
    { id: 2, name: "Amlong (BP)", time: "09:30 AM", status: "Pending" },
    { id: 3, name: "EcoSprin (Heart)", time: "01:00 PM", status: "Pending" },
    { id: 4, name: "Metformin (Sugar)", time: "08:00 PM", status: "Pending" }
  ]);

  // 🔄 2. ACTION: Dawai lene par status badalne ka function
  const toggleMedicine = (id) => {
    setMedicines(medicines.map(med => 
      med.id === id 
      ? { ...med, status: med.status === 'Taken' ? 'Pending' : 'Taken' } 
      : med
    ));
  };

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === 'caretaker') {
      setActivePage('Caretaker');
    } else {
      setActivePage('Overview');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setActivePage('Overview');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Overview': return <Overview />;
      
      // 🔗 3. CONNECTION: Data ko pages mein pass kiya (Props)
      // Elder ke liye: List + Tick karne ki taakat (onToggle)
      case 'Medications': 
        return <Medications medicines={medicines} onToggle={toggleMedicine} />;
        
      // Caretaker ke liye: Sirf List (Dekhne ke liye)
      case 'Caretaker': 
        return <Caretaker medicines={medicines} />;
        
      case 'Trends': return <Trends />;
      case 'Vault': return <Vault />;
      case 'Remedies': return <Remedies />;
      default: return <Overview />;
    }
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        userRole={userRole} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 p-4 md:p-12 md:ml-72 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;