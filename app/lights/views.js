// TODO: implement logic creating new light
async function create(req, res, next) {
  return res.json({ ok: true, action: 'create' });
}

// TODO: implement logic for editing light info
async function edit(req, res, next) {
  return res.json({ ok: true, action: 'edit' });
}

// TODO: implement logic for on/off light
// TODO: solve issue with concurent state updating
async function trigger(req, res, next) {
  return res.json({ ok: true, action: 'switch' });
}

module.exports = { create, edit, switch: trigger };
