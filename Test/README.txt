Introduction

A GitHub repository search application using React, TypeScript, and REST APIs. The app allows users to search for GitHub profiles, displaying user details like avatar, bio, followers, and repositories in a structured layout. It includes features like repository filtering by programming language and an interactive sidebar showing user organizations and stats. The interface is styled using custom CSS and plugin/modules such as MUI Material.


Technologies Used
React with TypeScript for building the UI.
Axios for making API requests.
CSS for styling.
GitHub REST API to fetch user and repository data.


Instructions to Run the Application

Prerequisites

Make sure you have the following installed on your system:

Node.js (v12.x or higher)
npm (v6.x or higher) 
All the necessary Dependancies

Type npm start to run The Development Server

When the Server runs a screen will show where you can enter username. If the username exists on github, the screen will navigate to repositories. If the user does not exist on Github, the app will display an alert. 

When the Repositories are shown, a sidebar is also shown that shows user information and stats.


FUTURE IMPROVEMENTS

There are several enhancements that could be made to improve this application. Adding pagination to handle large numbers of repositories would enhance performance and user experience. Implementing advanced filtering options, such as sorting by stars, forks, or activity, could allow users to find repositories more efficiently. Additionally, incorporating real-time data updates with web sockets or polling could keep the displayed information current. Improving the UI with more responsive design elements and transitions would enhance interactivity. Finally, integrating additional GitHub features like pull requests, issues, and starred repositories could provide a more comprehensive user profile.













