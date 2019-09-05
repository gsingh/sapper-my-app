export function post(req, res) {
	req.session.user=false;
	delete req.session.token_id;
	delete req.session.userName;
	res.end(JSON.stringify({ ok: true }));
}