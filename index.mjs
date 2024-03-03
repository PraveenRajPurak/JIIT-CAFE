// index.mjs
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.mjs';
import authAdminRoutes from './routes/adminAuth.mjs';
import authRoutes from './routes/auth.mjs';
import userRoutes from './routes/user.mjs';
import cors from 'cors';



const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
connectDB();

// Use your routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/adminAuth', authAdminRoutes);


app.listen(port, () => {
  console.log(`Server listening on port 3000`);
});
