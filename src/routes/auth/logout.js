export function post(req, res) {
	req.session.user=false;
	delete req.session.token_id;
	res.end(JSON.stringify({ ok: true }));
}