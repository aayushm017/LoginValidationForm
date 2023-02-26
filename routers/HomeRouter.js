const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema');

Router.get('/', (err, res) => {
    res.render('app', {title : '', password:'', email:''});  //The res.render() function is used to render a view and sends the rendered HTML string to the client. 
})

Router.post('/app', async(req, res) => {
    try {
        const {
            name,
            number,
            email,
            password,
            cpassword
        } = req.body;

        if (password === cpassword) {
            const Data = new homeSchema({
                name,
                number,
                email,
                password,
                cpassword
            })

            Data.save(err => {
                if (err) {
                    console.log('Error⚠️');
                } else {
                    res.render('app', { title: 'Submitted✌️', password: '', email: '' });
                }
            });

            const userEmail = await homeSchema.findOne({ email: email });
            if (email === userEmail.email) {
                res.render('app', { title: '', password: '', email: 'You have been registered with this email id⚠️, please use different id' });
            } else {
                console.log('err');
            }

        }else{
            res.render('app', {title : '', password:'Password Not Matched😨', email:''});
        }
        
    } catch(error) {
        res.render('app', {title : 'Error⚠️', password:'', email:''});
    }
})


// TODO: Sign In

Router.post('/login', (req, res) => {

    const {
        email,
        password
    } = req.body;

    homeSchema.findOne({ email: email }, (err, result) => {
        if (email === result.email && password === result.password) {
            // res.render('app', { title: 'Success👏', password: '', email: '' });
            res.render('dashboard', { name: result.name });
        } else {
            res.render('app', {title : '', password:'Password doesnt matched🙄', email:''});
        }
    })
})

module.exports = Router;