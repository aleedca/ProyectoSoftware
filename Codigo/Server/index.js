const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors({
  origin: ["https://inlotec.azurewebsites.net",
           /https:\/\/inlotec.azurewebsites.net\/.+/,
          "https://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Add specific CORS handling for preflight requests
app.options('*', cors()); // Enable pre-flight for all routes

// CLIENT FILES
const CLIENT_FILES = path.join(__dirname, '../client/build/');
app.use(express.static(CLIENT_FILES))

// Routers
const userRoutes = require("./routes/user.routes.js")
app.use("/", userRoutes);

const coursesRoutes = require("./routes/course.routes.js")
app.use("/", coursesRoutes); 

const groupRoutes = require("./routes/group.routes.js")
app.use("/", groupRoutes);

const teacherRoutes = require("./routes/teacher.routes.js")
app.use("/", teacherRoutes);

const scheduleRoutes = require("./routes/schedule.routes.js")
app.use("/", scheduleRoutes);

const catalogCourseRoutes = require("./routes/catalog.course.routes.js")
app.use("/", catalogCourseRoutes);

const locationRoutes = require("./routes/location.routes.js")
app.use("/", locationRoutes);

const modalityRoutes = require("./routes/modality.routes.js")
app.use("/", modalityRoutes);

const holidayRoutes = require("./routes/holiday.routes.js")
app.use("/", holidayRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_FILES, 'index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



