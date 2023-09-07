import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

//The body parser middleware takes the raw request body data and parses it into a formatted object on req.body for easy access in route handlers.
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
//CORS is a mechanism that allows resources on a web page to be requested from another domain outside their own domain.
app.use(cors());

app.use('/posts', postRoutes);
//* user: merm-user-admin password: 12345
//*mongodb+srv://merm-user-admin:<password>@cluster0.bhqjlyq.mongodb.net/

const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

//mongoose.set('useFindAndModify', false);
