const DUPLICATE_ERROR_CODE = 1062;

// TODO: implement logic creating new light
async function create(req, res) {
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
    return res.status(500).json({ error: 'Error while insert new device' });
  }
}

// TODO: implement logic for editing light info
async function edit(req, res) {
  return res.json({ ok: true, action: 'edit' });
}

// TODO: implement logic for on/off light
// TODO: solve issue with concurent state updating
async function trigger(req, res) {
  const CUSTOM_ERROR_CODES = [1, 2];

  const { body } = req;
  if (!(body.lightId && +body.stateId > 0)) {
    return res.status(422).json({
      error: 'State id is required',
    });
  }
  if (!(body.lightId && +body.lightId > 0)) {
    return res.status(422).json({
      error: 'Light device id is required',
    });
  }
  try {
    const updateRes = await req.db.triggerLightDevice(body.lightId, body.stateId);
    if (updateRes) {
      return res.status(200).json({ ok: true, action: 'update' });
    }
    return res.status(500).json({ error: 'Error while update device status' });
  } catch (err) {
    if (err.code && CUSTOM_ERROR_CODES.includes(err.code)) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Error while update device status' });
  }
}

// TODO: implement logic for listing lights
async function list(req, res) {
  try {
    const { body: { page, limit } } = req;
    let executeFunc = null;
    if (req.user.role_id === 1) {
      executeFunc = req.db.listAllLightDevices(page, limit);
    } else {
      executeFunc = req.db.listLightDevices(req.user.id, page, limit);
    }
    const result = await executeFunc;
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: 'Fail while list devices' });
  }
}

module.exports = {
  create, edit, switch: trigger, list,
};
