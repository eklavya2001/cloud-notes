require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/auth");
const { connectToMongo } = require("./connection");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URI;
const allowedOrigins = process.env.FRONTEND_URL || "*"; // Default to allow all if not set

// app.use(
//   cors({
//     origin: allowedOrigins.split(","), // Support multiple origins if needed
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.options("*", cors()); // Allow all preflight requests (OPTIONS)

app.use(
  cors({
    origin: "https://cloud-notebook-k6zl.onrender.com", // Support multiple origins if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// **1. CORS Middleware**

// **2. Body Parsing and Cookie Parsing**
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// **3. MongoDB Connection**
connectToMongo(mongourl);

// **4. API Routes**
app.use("/api/auth", authRoutes);
app.use("/api/notes", checkForAuthentication, noteRoutes);

// **5. Serve Static Files (React Frontend)**
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// // **6. React Routing Fallback**
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
// });

// **7. Start the Server**
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
