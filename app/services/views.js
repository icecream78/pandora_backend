async function manufactures(req, res) {
  try {
    const result = await req.db.manufacturesList();
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: 'Fail while list devices' });
  }
}

async function users(req, res) {
  try {
    const result = await req.db.systemUsersList();
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: 'Fail while list devices' });
  }
}

module.exports = {
  manufactures,
  users,
};
