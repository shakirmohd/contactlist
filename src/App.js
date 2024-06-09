import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import ContactList from './Components/ContactList/ContactList';
import AddContact from './Components/AddContact/AddContact';
import EditContact from './Components/EditContact/EditContact';
import Notification from './Components/Notification/Notification';
import Header from './Components/Header/Header';
import { useTheme } from './Components/Contexts/ThemeContext';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatistics, setShowStatistics] = useState(false);
  const [sortOrder, setSortOrder] = useState("ascending");
  const {isDarkMode} = useTheme()

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Header sortOrder={sortOrder} setSortOrder={setSortOrder} showStatistics={showStatistics} setShowStatistics={setShowStatistics} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Notification />
      <Routes>
        <Route exact path="/" element={<ContactList sortOrder={sortOrder} setSortOrder={setSortOrder} showStatistics={showStatistics} searchQuery={searchQuery} />} />
        <Route exact path="/add" element={<AddContact />} />
        <Route exact path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
