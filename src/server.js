import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyParser from 'body-parser';

const FileStore = sessionFileStore(session);

// Log every request
function logger(req, res, next) {
	console.log(`~> Received ${req.method} on ${req.url}`);
	next(); // move on
  }
  
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
var fileStoreOptions = {};
express()
	.use(bodyParser.json())
	.use(session({
		// store: new FileStore(fileStoreOptions),
		secret: 'keyboard cat',
		resave: false,
		// 
		rolling: true,
		cookie: {
			maxAge: 31536000
		},
		store: new FileStore({
			path: process.env.NOW ? `/tmp/sessions` : `.sessions`
	  })
	})) // You can also use Express
	.use(function(req, res, next) {
		// console.log(req.session.user);
		// console.log(req.session.token_id);
		if (typeof req.session.user === 'undefined') {
			req.session.user = false;
		}
		next()
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		logger,
		sapper.middleware({
			session: (req, res) => ({
				user: req.session && req.session.user
			})
		})
	)
	
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
