# DarkMedium

A **full-stack blogging platform** inspired by Medium, featuring secure authentication, content creation, image uploads, user collections, and tag-based organization. Built with Node.js & Express, MongoDB, React, Vite, and Tailwind CSS.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#Screenshots)
- [Project Structure](#project-structure)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
- [Future](#FutureWork)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Signup, Signin, Signout with JWT.
- **Blog CRUD**: Create, Read, Update, Delete blogs.
- **Image Uploads**: Local uploads & Cloudinary integration.
- **Tag System**: Organize blogs and users with tags.
- **User Profiles**: Avatar, bio, pronouns, collections, favorites.
- **Comments & Claps**: Responses, likes, and claps on blogs.
- **RESTful API**: Express backend, MongoDB models.
- **Modern Frontend**: React, Vite, Tailwind CSS, React Query, React Router.

---

## Screenshots 

![images](https://github.com/PrallavAggarwal/Projects-02/blob/projects/DarkMedium/frontend/darkMedium/src/assets/Screenshot%20From%202025-10-29%2014-49-06.png)
![image2](https://github.com/PrallavAggarwal/Projects-02/blob/projects/DarkMedium/frontend/darkMedium/src/assets/Screenshot%20From%202025-10-29%2014-49-28.png)
![image3](https://github.com/PrallavAggarwal/Projects-02/blob/projects/DarkMedium/frontend/darkMedium/src/assets/Screenshot%20From%202025-10-29%2014-49-40.png)
![image4](https://github.com/PrallavAggarwal/Projects-02/blob/projects/DarkMedium/frontend/darkMedium/src/assets/Screenshot%20From%202025-10-29%2014-51-35.png)

---

## Project Structure

```
DarkMedium/
│
├── backend/
│   ├── db/                # MongoDB connection and models
│   ├── middlewares/       # Authentication & user middlewares
│   ├── routes/            # Express API routes (blog, user, upload)
│   ├── utils/             # Cloudinary & Multer utilities
│   └── index.js           # Express app entrypoint
│
├── frontend/
│   └── darkMedium/        # React app (Vite, Tailwind, etc.)
│       ├── src/           # Frontend source code
│       ├── index.html     # HTML entrypoint
│       └── package.json   # Frontend dependencies
│
└── package.json           # Backend dependencies
```

---

## Tech Stack & Libraries

### Backend

- **Node.js** & **Express**: Server & routing.
- **MongoDB** & **Mongoose**: Database & object modeling.
- **JWT** (`jsonwebtoken`): Auth tokens.
- **bcrypt**: Password hashing.
- **dotenv**: Environment variable management.
- **cloudinary**: Cloud image hosting.
- **multer**: Handling image uploads.
- **zod**: Request validation.
- **cors**: Cross-origin resource sharing.

### Frontend

- **React**: UI library.
- **Vite**: Fast build tool.
- **Tailwind CSS**: Utility-first styling.
- **@tailwindcss/vite**: Tailwind integration for Vite.
- **React Router DOM**: Routing.
- **@tanstack/react-query**: Data fetching & caching.
- **ESLint**: Linting for code quality.
- **TypeScript** (types only): Type definitions.

---

## Getting Started

### Backend Setup

1. **Install dependencies**:
    ```bash
    cd backend
    npm install
    ```
2. **Configure Environment**:
    - Create a `.env` file with:
      ```
      PORT=5000
      DB_URL=<your-mongodb-connection-string>
      JWT_SECRET_KEY=<your-jwt-secret>
      CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
      CLOUDINARY_API_KEY=<your-cloudinary-key>
      CLOUDINARY_API_SECRET=<your-cloudinary-secret>
      ```
3. **Run server**:
    ```bash
    node index.js
    ```

### Frontend Setup

1. **Install dependencies**:
    ```bash
    cd frontend/darkMedium
    npm install
    ```
2. **Run development server**:
    ```bash
    npm run dev
    ```
3. **Access the app**:
    - Open [http://localhost:5173](http://localhost:5173)

---

## API Overview

### User

- `POST /api/v1/user/signup`: Register new user
- `POST /api/v1/user/signin`: Authenticate user
- `POST /api/v1/user/signout`: Logout

### Blog

- `POST /api/v1/blog/create`: Create blog (with image upload)
- `GET /api/v1/blog/blogs`: Get blogs by user tags
- `GET /api/v1/blog/allBlogs`: Get all blogs
- `GET /api/v1/blog/userBlogs`: Get blogs by user
- `DELETE /api/v1/blog/delete`: Delete blog

### Upload

- `POST /api/v1/blog/upload`: Upload image (Cloudinary)

> **Note:** Most routes require JWT authentication in request headers.

---

## FutureWork

- Adding recursive Response feature to each blog.
- Adding Like feature with limit of one time one like.
- Adding more Tags and custom Tags.
- UI improvements.
- UX improvements.

---

## Environment Variables

Make sure you set the following variables in your `.env` files:

```env
PORT=5000
DB_URL=mongodb://localhost:27017/darkmedium
JWT_SECRET_KEY=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

---

## Contributing

1. Fork the repo and create your branch.
2. Write clear, concise commits and PRs.
3. Ensure code style (`eslint`) and add tests if possible.
4. Open a pull request!

---

## License

ISC

---

**Author:** Prallav Aggarwal

---

## Additional Notes

- The backend is designed to be **modular** and scalable, with clear separation between database models, middlewares, routes, and utility functions.
- **Image uploads** are handled securely using Multer for local storage and Cloudinary for cloud hosting. Uploaded files are automatically deleted from local disk after successful upload to Cloudinary.
- **Validation** of user input is done using Zod for safer request handling.
- **Frontend** uses the latest React practices, including React Query for data fetching, Tailwind CSS for styling, and Vite for blazing-fast development.
- **API error handling** is implemented for robust and predictable responses.

If you have any questions, suggestions, or want to discuss improvements, feel free to open an issue or reach out!

---
