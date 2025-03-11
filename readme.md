# JWT Authentication API

This is a simple **JWT Authentication API** built with **Node.js** and **Express.js** to generate and return a JWT token for authentication with **Wicket API**.

## Features
- ✅ Generates **JWT tokens** with configurable expiration time.
- ✅ Uses **environment variables** for security.
- ✅ Built with **Express.js** and **jsonwebtoken (JWT)**.
- ✅ CI/CD support using **GitHub Actions**.
- ✅ Can be deployed on **Vercel, Render, or AWS**.

---

## 📌 Prerequisites
### Install Dependencies
Make sure you have **Node.js** installed, then run:
```bash
npm install
```

### Environment Variables (`.env`)
Create a `.env` file in the root directory and add:
```
PORT=5000
SECRET_KEY=your_secret_api_key
ADMIN_USER_UUID=your_admin_user_uuid
AUDIENCE=https://<tenant>-api.wicketcloud.com
ISSUER=https://your-website.com
EXPIRATION_TIME=900  # (Token expires in seconds, default is 15 minutes)
```
> **⚠️ Do NOT commit your `.env` file!**

---

## 📌 API Endpoints
### **1. Generate JWT Token**
#### **Endpoint:**
```http
POST /api/authenticate
```
#### **Request Body:**
```json
{
  "adminUserUUID": "your_admin_user_uuid"
}
```
#### **Response:**
```json
{
  "jwt_token": "your_generated_jwt_token"
}
```

---

## 📌 Running the API Locally
### Start the Server
```bash
node server.js
```

### Test the API
Make a `POST` request to:
```
http://localhost:5000/api/authenticate
```
with the **adminUserUUID** in the request body.

---

## 📌 Using JWT Token in API Requests
Once you obtain the JWT token, include it in the **Authorization** header:

```
Authorization: Bearer <JWT Token>
```

### Example API Call with cURL:
```bash
curl -X GET "https://<tenant>-api.wicketcloud.com/your-endpoint" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📌 Deployment & CI/CD
### Hosting on GitHub
1. Initialize Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - JWT Auth API"
   ```
2. Create a GitHub repository.
3. Add remote origin:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/jwt-auth-api.git
   git branch -M main
   git push -u origin main
   ```

### CI/CD with GitHub Actions
Create a `.github/workflows/deploy.yml` file for **CI/CD** automation:
```yaml
name: Deploy JWT Auth API

on:
  push:
    branches:
      - main

env:
  SECRET_KEY: ${{ secrets.SECRET_KEY }}
  ADMIN_USER_UUID: ${{ secrets.ADMIN_USER_UUID }}
  AUDIENCE: ${{ secrets.AUDIENCE }}
  ISSUER: ${{ secrets.ISSUER }}
  EXPIRATION_TIME: ${{ secrets.EXPIRATION_TIME }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Start API
        run: node server.js
```

---

## 📌 Security Considerations
- **Never expose your `.env` file**.
- Use **GitHub Secrets** for API keys.
- Implement **token expiration & refresh mechanisms**.

---


