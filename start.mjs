import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
   console.log('loading .env');
   dotenv.config();
}

import { user } from './server.mjs';

const port = process.env.PORT || '8000';

const server = user.listen(port, () => {
   console.log(`Listening to http://127.0.0.1:${port}`);
});

process.on('SIGTERM', () => {
   console.info('SIGTERM signal received.');
   console.log('Closing http server.');
   server.close(() => {
      console.log('Http server closed.');
   });
});
