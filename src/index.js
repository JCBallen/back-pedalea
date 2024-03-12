import app from './app.js';
import router from './routes/index.js';

app.use(router);

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));