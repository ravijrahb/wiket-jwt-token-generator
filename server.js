require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Generate JWT Token
app.post("/api/authenticate", (req, res) => {
    try {
        // Retrieve values from .env file
        const adminUserUUID = process.env.ADMIN_USER_UUID;
        const secretKey = process.env.SECRET_KEY;
        const audience = process.env.AUDIENCE;
        //const issuer = process.env.ISSUER;
        const expirationTime = process.env.EXPIRATION_TIME || 900; // Default to 15 minutes if not set

        if (!adminUserUUID || !secretKey || !audience || !issuer) {
            return res.status(500).json({ error: "Missing environment variables. Check .env file." });
        }

        const payload = {
            exp: Math.floor(Date.now() / 1000) + parseInt(expirationTime), // Token expiration
            sub: adminUserUUID, // API Admin UUID
            aud: audience, // Wicket API URL
            iss: issuer // Issuer domain
        };

        const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });

        res.json({ jwt_token: token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ JWT Auth API running on http://localhost:${PORT}`);
});