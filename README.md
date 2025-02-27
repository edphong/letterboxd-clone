# myBacklog - Letterboxd Clone 
## About
A Letterboxd-inspired web application built with RESTful APIs, leveraging TMDB for media data. Users can explore movie details, genres, reviews, and more through a sleek, responsive interface.

### Landing Page
![Screenshot_from_2025-01-17_15-12-00](https://github.com/user-attachments/assets/ac91b1e1-24c3-45d1-a5c7-f08ccc8f3ad3)

### Film Information 
![image](https://github.com/user-attachments/assets/641c9667-39c3-4121-bf65-f74a711b6b88)

### Television Show Information
![image2](https://github.com/user-attachments/assets/aefbf768-af18-4981-aaff-7f4a187d176c)

## Features
- Browse media (Movies & TV Shows) seamlessly.
- View detailed information of selected media including but not limited to genres, reviews, release dates and more.
- Interactive and responsive design for an optimal user experience.
- Designed with a focus on modern UI/UX principles for intuitive navigation and aesthetic appeal.
- Implemented an efficient search algorithm to efficiently search and navigate API data.

## Tech Stacks
- **React & CSS**: Building the frontend and ensuring responsive, user-friendly interfaces.
- **Java, Spring Boot & Apache Maven**: For backend development and efficient dependency management.
- **Docker**: To containerize the application for easy deployment and scalability.
- **TMDB APIs**: Leveraging The Movie Database's APIs to fetch movie and TV show data.

## Getting Started
### Prerequisites
Ensure you have the latest version of Docker installed (27.5.0 as of January 2025). You can verify your installation by running: 
```
docker --version
```

### Obtain API Key and Set up Environment Variables
1. Go to The Movie Database (TMDB) website.
2. Create an account or log in if you already have one.
3. Go to your account settings, navigate to the API section, and request an API key.
4. Copy paste API key into **.env** file.

### Running the Application with Docker via Command Line
1. Clone Repository
2. Terminal 1: Build and Run Backend
```
cd backend
docker build -t my-backend -f dockerfile-backend .
docker run --name backend-container -p 8080:8080 --env-file .env backend
```
4. Terminal 2: Build and Run Frontend
```
cd frontend
docker build -t my-frontend -f dockerfile-frontend .
docker run --name frontend-container -p 3000:80 frontend
```
4. Navigate to (http://localhost:3000)
5. To terminate:
```
docker stop backend-container frontend-container
docker rm backend-container frontend-container
```

