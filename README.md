# Social App

Social App is a full-stack social media application built with React.js for the frontend, Node.js for the backend, and MySQL for the database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Technologies Used](#technologies-used) 

## Introduction

Social App is a platform that allows users to connect, share posts, and interact with each other. It provides a responsive and intuitive user interface for a seamless social media experience.

## Features

- User authentication and authorization
- Posting and sharing content
- Liking and commenting on posts
- Profile management

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/patrickptran/social_app.git

Then navigate to the project directory:
  
``cd social_app``

Install frontend dependencies:

``cd client``<br>
``yarn install``

Install backend dependencies:<br>
``cd ../api``<br>
``yarn install``
### Running The App
1. Start the backend server:<br>
``cd api``<br>
``nodemon index.js``

2. Start the frontend application:<br>
``cd ../client``<br>
``yarn run vite``

### Technologies Used

#Frontend:

- React.js
- SCSS
- Material-UI
- Vite

#Backend:

- Node.js
- Express.js
- MySQL
- Axios
