// services/githubService.ts
import axios from 'axios';

export const fetchUserDetails = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};
