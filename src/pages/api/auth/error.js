export default async function handle(req, res) {
    res.redirect("/error?e=" + req.query?.error || "Unknown")
    // res.status(200).end(`error: ${JSON.stringify(req.query)}, ${JSON.stringify(req.body)}`);
}