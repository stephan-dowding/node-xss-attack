import express from 'express';
import bodyParser from 'body-parser';
import {init, addComment, getComments} from './db/repo';
const app = express();
init();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug');

app.get('/', async (req, res) => {
    const comments = await getComments();
    res.render('index', {comments});
});

app.post('/', async (req, res) => {
    await addComment(req.body.comment);
    res.redirect('/');
});

module.exports = app;
