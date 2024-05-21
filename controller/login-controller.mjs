import bcrypt from 'bcrypt'
import fs from 'fs';

import * as userModel from '../model/student_services_lite.mjs';
export let showLogInForm = function (req, res) {
    res.render('login', {
        pageTitle: 'ECE students - login'
    });
}

export let doLogin = async function (req, res) {
    try {
        const { username, password } = req.body;
        const user = await userModel.getUserInfo(username);
        if (!user[0]){
            return res.status(401).json({ message: 'Invalid username' });
        } 
        const match = await bcrypt.compare(password, user[0].password);
            if (!match){
                return res.status(401).json({ message: 'Invalid password' });
            } else {
                req.session.loggedUserId = user[0].academic_id;
                const redirectTo = req.session.originalUrl || "/home_page";
                res.redirect(redirectTo);
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
    }
}

export let doLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

export let checkAuthenticated = function (req, res, next) {
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        next();
    }
    else {
        if ((req.originalUrl === "/login")) {
            next()
        }
        else {
            console.log("not authenticated, redirecting to /login")
            res.redirect('/login');
        }
    }
}