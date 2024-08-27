export default async function handle(req, res) {
    const { error } = req.query
    res.status(200).end(error);

}