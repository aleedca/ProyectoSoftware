const express = require('express')
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

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

app.listen(3001, () => {
  console.log("Server running on port 3001")
});



