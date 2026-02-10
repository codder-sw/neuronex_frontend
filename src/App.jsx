import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Medications from './pages/Medications';
import Trends from './pages/Trends';
import Vault from './pages/Vault';
import Remedies from './pages/Remedies';
import Caretaker from './pages/Caretaker';
import Login from './pages/Login';
import Register from './pages/Register'; // 🆕 1. Register Import kiya

function App() {
  const [userRole, setUserRole] = useState(null); 
  
  // 🆕 2. State: Decide karega ki Login dikhana hai ya Register
  const [authView, setAuthView] = useState('login'); 
  
  const [activePage, setActivePage] = useState('Overview');

  // 💊 MASTER DATA (Same as before)
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Thyronorm (Thyroid)", time: "07:00 AM", status: "Pending" },
    { id: 2, name: "Amlong (BP)", time: "09:30 AM", status: "Pending" },
    { id: 3, name: "EcoSprin (Heart)", time: "01:00 PM", status: "Pending" },
    { id: 4, name: "Metformin (Sugar)", time: "08:00 PM", status: "Pending" }
  ]);

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
    setAuthView('login'); // 🆕 Logout karne par wapis Login page par bhejo
    setActivePage('Overview');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Overview': return <Overview />;
      case 'Medications': return <Medications medicines={medicines} onToggle={toggleMedicine} />;
      case 'Caretaker': return <Caretaker medicines={medicines} />;
      case 'Trends': return <Trends />;
      case 'Vault': return <Vault />;
      case 'Remedies': return <Remedies />;
      default: return <Overview />;
    }
  };

  // 🚪 3. GATEKEEPER LOGIC UPDATE (Yahan Magic hai)
  // Agar koi login nahi hai...
  if (!userRole) {
    // ...aur agar wo 'register' karna chahta hai
    if (authView === 'register') {
      return <Register onSwitchToLogin={() => setAuthView('login')} />;
    }
    // ...warna Login page dikhao
    return <Login 
      onLogin={handleLogin} 
      onSwitchToRegister={() => setAuthView('register')} 
    />;
  }

  // Agar login hai, toh Main App dikhao
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