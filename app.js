import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors';
import { IamTokenManager }  from 'ibm-watson/auth/index.js'



const app = express()
dotenv.config()
const port = process.env.PORT;

const serviceUrl = process.env.SPEECH_TO_TEXT_URL;
const tokenManager = new IamTokenManager({
    apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY || '<iam_apikey>',
});


app.use(helmet())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/credentials', async (req, res, next) => {
    try {
      const accessToken = await tokenManager.getToken();
      res.json({
        accessToken,
        serviceUrl,
      });
    } catch (err) {
      next(err);
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})