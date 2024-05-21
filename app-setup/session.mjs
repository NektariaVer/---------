import session from 'express-session'

import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

let userSession = session({
secret: process.env.SESSION_SECRET,
name: process.env.SESSION_NAME || 'app-session',
cookie: {maxAge: 1000 * 60 * 60 * 2, sameSite: true},
resave: false,
saveUninitialized: false
});

export default userSession;
