import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import '../css/Headerr.css'; // Import the CSS

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" className="appbar">
      <Toolbar className="toolbar">
        <Typography variant="h4" className="logo">
          GitHub User Info
        </Typography>
        <Button
          component={Link}
          to="/"
          startIcon={<CodeIcon />}
          className="button"
        >
          Repositories
        </Button>
        <Button
          component={Link}
          to="/Overview"
          startIcon={<HomeIcon />}
          className="button"
        >
          Overview
        </Button>
        <Button
          component={Link}
          to="/projects"
          startIcon={<FolderIcon />}
          className="button"
        >
          Projects
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
