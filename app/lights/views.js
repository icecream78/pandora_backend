const DUPLICATE_ERROR_CODE = 1062;

// TODO: implement logic creating new light
async function create(req, res, next) {
  const {
    body: {
      name, manufacturer, address, state, userId,
    },
  } = req;
  if (!name || !manufacturer || !address || !state || !userId) {
    return res.status(422).json({
      error: 'All fields are required',
    });
  }

  try {
    const insertRes = await req.db.insertNewLightDevice(req.body);
    if (insertRes) {
      return res.json({ ok: true, action: 'create' });
    }
    return res.status(400).json({ error: 'Error while insert new device' });
  } catch (err) {
    if (err.errno === DUPLICATE_ERROR_CODE) {
      return res.status(409).json({ error: 'Try add dublicate light info' });
    }
    return res.status(400).json({ error: 'Error while insert new device' });
  }
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

// TODO: implement logic for listing lights
async function list(req, res, next) {
  const { body: { page, limit } } = req;
  let executeFunc = null;
  if (req.user.role_id === 1) {
    executeFunc = req.db.listAllLightDevices(page, limit);
  } else {
    executeFunc = req.db.listLightDevices(req.user.id, page, limit);
  }
  const result = await executeFunc;
  return res.status(200).json({ result });
}

module.exports = {
  create, edit, switch: trigger, list,
};
