### **Backend README (`mini-blog-backend/README.md`)**

```markdown
# Mini Blog Post Manager - Backend

This is the backend for the Full Stack Mini Blog Post Manager assignment. It's a lightweight and efficient REST API built with Express.js to handle CRUD (Create, Read, Update, Delete) operations for admin-created blog posts.

The API uses `lowdb`, a simple file-based database, for persistent data storage, making the project easy to set up and run without any external database dependencies.

## ✨ Core Features

-   **RESTful API**: Provides a clear and structured set of endpoints for managing blog posts.
-   **File-Based Storage**: Uses `lowdb` to store post data in a `db.json` file, simplifying setup and ensuring data persists between server restarts.
-   **Structured Codebase**: Organized using a Model-View-Controller (MVC) pattern, with logic separated into routes, controllers, and a database module.
-   **TypeScript Support**: Fully written in TypeScript for type safety and improved developer experience.

## 🚀 Tech Stack

-   **Framework**: [Express.js](https://expressjs.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [lowdb](https://github.com/typicode/lowdb) (for file-based JSON storage)
-   **CORS**: Enabled with the `cors` middleware to allow requests from the frontend.

## 📋 API Endpoints

The API exposes the following endpoints.

### Admin Routes

All admin routes are prefixed with `/admin`.

| Method | Route                | Description                          |
| :----- | :------------------- | :----------------------------------- |
| `GET`  | `/admin/posts`       | Get a list of all posts.             |
| `POST` | `/admin/posts`       | Add a new post to the database.      |
| `PUT`  | `/admin/posts/:id`   | Update an existing post by its ID.   |
| `DELETE`| `/admin/posts/:id`   | Delete a post from the database.     |

### Public Route

A public, non-admin endpoint is also available for the frontend to fetch posts.

| Method | Route          | Description                 |
| :----- | :------------- | :-------------------------- |
| `GET`  | `/api/posts`   | Get a list of all posts.    |


## 🛠️ Setup and Installation

Follow these steps to get the backend server running locally.

### 1. Clone the Repository

```bash
git clone <your-backend-repo-url>
cd mini-blog-backend
npm install
npm run dev