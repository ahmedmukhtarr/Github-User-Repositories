import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './screens/Sidebar';
import Overview from './screens/Overview';
import Repositories from './screens/Repositories';
import Projects from './screens/Projects';
import Header from './screens/Header';
import { Grid } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any | null>(null);  // State to store user information
  const [orgs, setOrgs] = useState<string[]>([]); // State for organizations

  // Function to fetch user data
  const fetchUserData = async (username: string) => {
    try {
      // Fetch user profile
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserInfo(userResponse.data);

      // Fetch user organizations
      const orgsResponse = await axios.get(userResponse.data.organizations_url);
      setOrgs(orgsResponse.data.map((org: any) => org.login));

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Default fetch for a specific user (you can change this or remove it)
    fetchUserData('');  // Fetch user data when the app starts
  }, []);

  return (
    <Router>
      <Header /> {/* Include the Header component here */}
      <div className="app-container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            {/* Pass userInfo and orgs as props to Sidebar */}
            {userInfo && (
              <Sidebar
                userInfo={{
                  avatar_url: userInfo.avatar_url,
                  name: userInfo.name || userInfo.login,
                  bio: userInfo.bio,
                  followers: userInfo.followers,
                  following: userInfo.following,
                  email: userInfo.email || 'N/A',
                  organizations_url: orgs,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            <Routes>
              <Route path="/" element={<Repositories />} />
              <Route path="/Overview" element={<Overview />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
