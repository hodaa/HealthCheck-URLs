import http from 'http';
import app from './app.js';
import monitorService from './services/monitorService.js';
import mongoose from "mongoose";
mongoose.connect(process.env.MONG_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});
const server = http.createServer(app);
const port = process.env.APP_PORT || 4000;
// server listening
server.listen(port, () => {
    monitorService.monitor();
    console.log(`Server running on port ${port}`);
});
