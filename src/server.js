import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyParser from 'body-parser';

const FileStore = sessionFileStore(session);


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
var fileStoreOptions = {};
express()
	.use(bodyParser.json())
	.use(session({
		// store: new FileStore(fileStoreOptions),
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new FileStore({
			path: process.env.NOW ? `/tmp/sessions` : `.sessions`
	  })
	})) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				user: res.session && res.session.user
			})
		})
	)
	
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
