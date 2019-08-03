import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
var fileStoreOptions = {};
express() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user
			})
		})
	)
	.use(session({
		store: new FileStore(fileStoreOptions),
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		}
	  })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
