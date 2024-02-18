import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import communityRoute from './routes/communityRoutes.js';
import postRoute from './routes/postRoutes.js';
import commentRoute from './routes/commentRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use((req, res, next) => {
  // Allow requests from specific origin
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://citadel-front.netlify.app/'
  );

  // Allow specific methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Allow specific headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow credentials
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Proceed to the next middleware
  next();
});
// app.use(
//   cors({ origin: 'https://citadel-front.netlify.app/', credentials: true })
// );
app.use(express.json());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'citadel',
    });
    console.log('connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

connect();

// app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/community', communityRoute);
app.use('/api/comment', commentRoute);
// app.use('/api/community', communityRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(errorStatus).send(errorMessage);
});

app.listen(process.env.PORT || 1337, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
