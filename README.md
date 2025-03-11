# University Finder App

This is a web application built with Next.js and Express, allowing users to browse universities worldwide, search by country or name, and mark universities as favorites.

## Features

- Browse Universities: View a list of universities from around the world.
- Search Filter: Search for universities by country and university name.
- Favorites: Mark universities as favorites and view the saved ones.
- Responsive Design: Built for seamless use across devices.

## Technology Stack
- Frontend: Next.js (React)
- Backend: Express.js
- Database: MongoDB
- Styling: CSS Modules
- API: Axios for API requests
- Docker: Containerization for seamless deployment

## Running the Application with Docker

### Prerequisites
Make sure you have Docker installed on your system before proceeding.

### Steps to Run the Application
- Clone the repository

- Set up the environment variables in backend directory and this app is using docker for mongodb as well
Create a .env file in the backend directory with the following:

```
MONGO_URI=mongodb://localhost:27017/universities
PORT=3001
NODE_ENV=development
```

- Build the Docker images
```
docker-compose build  or docker compose build 
```

-Run the application using Docker
```
docker-compose up or docker compose up
```

Once Docker has started, the services will be accessible at the following links:

- Frontend (Next.js): http://localhost:3000
- Backend (Express): http://localhost:3001

To stop the running Docker containers, simply use:

```
docker-compose down
```

