import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  SelectChangeEvent,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import Sidebar from './Sidebar';  // Import Sidebar
import { Star, ForkRight, ExpandMore } from '@mui/icons-material'; // Icons for display
import '../css/Repositories.css'; // Import the CSS file for styling

const RepositoriesScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // For the user search
  const [repoSearchTerm, setRepoSearchTerm] = useState<string>(''); // For the repository search
  const [language, setLanguage] = useState<string>(''); // For filtering by language
  const [repositories, setRepositories] = useState<any[]>([]); // For storing repositories
  const [originalRepositories, setOriginalRepositories] = useState<any[]>([]); // For storing original repositories
  const [userInfo, setUserInfo] = useState<any | null>(null); // For user info
  const [orgs, setOrgs] = useState<string[]>([]); // For organizations
  const [expandedRepoId, setExpandedRepoId] = useState<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRepoSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoSearchTerm(event.target.value);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  const fetchUserData = async (username: string) => {
    try {
      const token = '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'; // Replace with your token
      const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setUserInfo(userResponse.data);

      const orgsResponse = await axios.get(userResponse.data.organizations_url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setOrgs(orgsResponse.data.map((org: any) => org.login));

      // Fetch repositories for the user
      await fetchRepositories(username);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        alert('User not found. Please check the username and try again.');
        setUserInfo(null);
        setRepositories([]);
        setOriginalRepositories([]); // Reset original repositories on user not found
      } else {
        console.error('Error fetching user data:', axiosError);
      }
    }
  };

  const fetchRepositories = async (username: string) => {
    try {
      const token = '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'; // Replace with your token
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setRepositories(reposResponse.data);
      setOriginalRepositories(reposResponse.data); // Store original repositories
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 403) {
        alert('You have exceeded the rate limit. Please try again later.');
      } else {
        console.error('Error fetching repositories:', axiosError);
      }
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      fetchUserData(searchTerm); // Fetch user data on search
    }
  };

  const handleRepoClick = (repoId: number) => {
    setExpandedRepoId(expandedRepoId === repoId ? null : repoId); // Toggle expanded state
  };

  const handleRepoSearchClick = () => {
    if (userInfo) {
      // Filter repositories based on search term and language
      const filteredRepos = originalRepositories.filter(repo => 
        (repoSearchTerm ? repo.name.toLowerCase().includes(repoSearchTerm.toLowerCase()) : true) &&
        (language ? repo.language === language : true)
      );

      if (filteredRepos.length === 0) {
        alert('No repositories found matching your criteria.');
      }

      setRepositories(filteredRepos);
    }
  };

  const getLanguageClass = (language: string | null) => {
    if (!language) return ''; // Return empty string if language is null

    // Map languages to their respective class names
    const languageClasses: { [key: string]: string } = {
      JavaScript: 'javascript',
      TypeScript: 'typescript',
      Python: 'python',
      Java: 'java',
      C: 'c',
      CPlusPlus: 'cplusplus',
      Ruby: 'ruby',
      Go: 'go',
      PHP: 'php',
      CSharp: 'csharp',
      Swift: 'swift',
      Kotlin: 'kotlin',
      HTML: 'html',
      CSS: 'css',
      // Add more languages as needed
    };

    return `language-badge ${languageClasses[language] || 'other-language'}`; // Default to 'other-language' if not found
  };

  return (
    <div className="repositories-screen">
      <Grid>
        {userInfo && (
          <Grid>
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
          </Grid>
        )}

        <Grid item xs={userInfo ? 9 : 12}>
          {!userInfo && (
            <>
              <h2 style={{ color: '#B7E0FF' }}>Search User</h2>
              <Grid container spacing={1} className="search-filter-bar">
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    label="Enter Username"
                    className="custom-text-field"
                  />
                </Grid>
                <Grid item xs={16} sm={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSearchClick}
                    style={{ height: 55 }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {userInfo && (
            <>
              <h2>Search Repositories</h2>
              <Grid container spacing={3} className="search-filter-bar" style={{ marginRight: 30 }}>
                <Grid item xs={13} sm={6}>
                  <FormControl variant="outlined" fullWidth className="custom-text-field">
                    <InputLabel>Filter by Language</InputLabel>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      label="Filter by Language"
                      style={{ width: '109%' }}
                    >
                      <MenuItem value="">
                        <em>All Languages</em>
                      </MenuItem>
                      <MenuItem value="JavaScript">JavaScript</MenuItem>
                      <MenuItem value="TypeScript">TypeScript</MenuItem>
                      <MenuItem value="Python">Python</MenuItem>
                      <MenuItem value="Java">Java</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="C++">C++</MenuItem>
                      <MenuItem value="Ruby">Ruby</MenuItem>
                      <MenuItem value="Go">Go</MenuItem>
                      <MenuItem value="PHP">PHP</MenuItem>
                      <MenuItem value="C#">C#</MenuItem>
                      <MenuItem value="Swift">Swift</MenuItem>
                      <MenuItem value="Kotlin">Kotlin</MenuItem>
                      <MenuItem value="HTML">HTML</MenuItem>
                      <MenuItem value="CSS">CSS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={repoSearchTerm}
                    onChange={handleRepoSearchChange}
                    label="Enter Repo Name"
                    style={{ width: '109%' }}
                    className="custom-text-field"
                  />
                </Grid>
                <Grid item xs={16} sm={4} style={{ marginLeft: "1px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRepoSearchClick}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {repositories.length > 0 && (
            <div>
              {repositories.map((repo) => (
  <Card key={repo.id} style={{ margin: 20, backgroundColor: '#1a1a1a' }} className="repo-card">
    <CardContent>
      <Typography variant="h5">
        {/* Show language badge before the repository name */}
        {repo.language && <span className={getLanguageClass(repo.language)}>{repo.language}</span>}
        &nbsp; {/* Add space between language badge and name */}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white' }}>
          {repo.name}
        </a>
      </Typography>
      <Typography marginTop='10px' variant="body2" color="white">
        Stars: {repo.stargazers_count} <Star />
      </Typography>
      <Typography variant="body2" color="white">
        Forks: {repo.forks_count} <ForkRight />
      </Typography>
      <IconButton style={{ color: 'white' }} onClick={() => handleRepoClick(repo.id)}>
        <ExpandMore />
      </IconButton>
      <Collapse in={expandedRepoId === repo.id} timeout="auto" unmountOnExit>
        <Typography variant="body2" color="white">
          Description: {repo.description || 'No description available'}
        </Typography>
        <Typography variant="body2" color="white">
          Created At: {new Date(repo.created_at).toLocaleDateString()}
        </Typography>
      </Collapse>
    </CardContent>
  </Card>
))}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RepositoriesScreen;
