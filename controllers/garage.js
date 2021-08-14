import { getUniqueGarageId } from "../helpers";
import { garageModel, carModel, userModel } from "../models";

export const newGarage = async (req, res, next) => {
  // Adds a garage
  const name = req.body.name.toLowerCase().trim();
  const desc = req.body.desc.toLowerCase().trim();
  const owner = req.session.userId;

  let time = new Date();

  try {
    const newGarageId = await getUniqueGarageId(owner);

    const newGarage = await garageModel.create({
      ID: newGarageId,
      name: name,
      desc: desc,
      owner: owner,
    });

    await userModel.updateOne(
      { _id: owner },
      { $addToSet: { garages: newGarage._id } },
      (err) => {
        if (err) console.log(err);
      }
    );

    res.status(200).json({
      ID: newGarage.ID,
      name: newGarage.name,
      desc: newGarage.desc,
      owner: newGarage.owner,
    });

    console.log(
      `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  NEW GARAGE\n    ${name} - ${desc} - ${newGarageId}\n    ${owner}`
    );

    const user = await userModel.findOne({ _id: owner }).populate("garages");

    console.log(user);
  } catch (err) {
    console.log(err);
  }
};

export const rmGarage = (req, res, next) => {
  // Removes a garage
  let garageToRemove = req.params.garageID;
};

export const getGarage = async (req, res, next) => {
  // Gives garage(s) with the id param
  const garage_id = req.params.garage_id;
  const owner = req.session.userId;

  const garage = await garageModel.findOne({ owner: owner, _id: garage_id });

  if (!garage) {
    return res
      .status(404)
      .json({ message: `No garage with an id of ${garage_id}` });
  }

  res.status(200).json({ garage: garage });
};

export const renameGarage = async (req, res, next) => {
  const owner = req.session.userId;
  const newName = req.body.newName.toLowerCase().trim();
  const newDesc = req.body.newDesc.toLowerCase().trim();
  const garage_id = req.params.garage_id;

  if (!newName || !garage_id)
    return res.status(400).json({ message: "bad request" });

  await garageModel.findOneAndUpdate(
    { _id: garage_id, owner: owner },
    {
      $set: {
        name: newName,
        desc: newDesc,
      },
    },
    (err, doc) => {
      if (err) return console.log(err);
    }
  );

  res.status(201).send();
};

export const searchGarage = async (req, res) => {
  const searchQuery = req.query.q.toLowerCase();
  const owner = req.session.userId;

  const user = await userModel.findOne({ _id: owner }).populate("garages");

  let toSend = user.garages.filter(
    (garage) =>
      garage.name.startsWith(searchQuery) ||
      garage.name.includes(searchQuery) ||
      garage.desc.includes(searchQuery)
  );

  if (!toSend.length)
    return res.status(204).json({ message: `No garages found` });

  if (toSend.length > 10) {
    toSend = toSend.slice(0, 11);
  }

  console.log(toSend);

  return res.status(200).json(toSend);
};
