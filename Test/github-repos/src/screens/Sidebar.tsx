import React from 'react';
import { Button } from '@mui/material';
import '../css/sidebar.css'; // Import the Sidebar.css file

// Define the type for the userInfo prop
interface SidebarProps {
  userInfo: {
    avatar_url: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    email: string;
    organizations_url: string[];
  };
}

const Sidebar: React.FC<SidebarProps> = ({ userInfo }) => {
  const { avatar_url, name, bio, followers, following, email, organizations_url } = userInfo;

  return (
    <div className="sidebar">
      <div className="user-info">
        <img src={avatar_url} alt="User Profile" className="profile-image" />
        <h2 style={{color:'#B7E0FF'}}>{name}</h2>
        <p>{bio}</p>
        <Button  className="follow-button" style={{color:'black', backgroundColor:'white'}}>
          Follow
        </Button>
      </div>
      <div className="stats">
        <div className="stat-item">
          <span>Followers: </span>
          <span style={{fontSize:25}}>{followers}</span>
        </div>
        <div className="stat-item">
          <span>Following: </span>
          <span style={{fontSize:25}}>{following}</span>
        </div>
      </div>
      <div className="contact-info">
        {email && (
          <p>
            <strong>Email:</strong> <a href={`mailto:${email}`} style={{fontSize:25, color:'#B7E0FF'}}>{email}</a>
          </p>
        )}
        <p style={{fontSize:25}}><strong>Organizations:</strong></p>
        <ul>
          {organizations_url.length > 0 ? (
            organizations_url.map((org, index) => (
              <li key={index}>{org}</li>
            ))
          ) : (
            <li>No organizations found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
