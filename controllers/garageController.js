import { getUniqueGarageId } from "../helpers/carHelpers";
import { garageModel, carModel } from "../models";

export const newGarage = async (req, res, next) => {
  // Adds a garage
  const name = req.body.name.toLowerCase();
  const desc = req.body.desc.toLowerCase();
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

    newGarage.save();

    res.status(200).json(newGarage);

    console.log(
      `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  NEW GARAGE\n    ${name} - ${desc} - ${newGarageId}\n    ${owner}`
    );
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
  const garageID = req.params.garageID;
  const owner = req.session.userId;

  const garage = await garageModel.findOne(
    { owner: owner, ID: garageID },
    "-_id -__v"
  );

  if (!garage) {
    return res
      .status(404)
      .json({ message: `No garage with an id of ${garageID}` });
  }

  let cars = await carModel.find({ owner: owner, "garage.ID": garageID });

  res.status(200).json({ garage: garage, cars: cars });
};

export const renameGarage = async (req, res, next) => {
  const owner = req.session.userId;
  const newName = req.body.newName.toLowerCase();
  const newDesc = req.body.newDesc.toLowerCase();
  const garageID = req.params.garageId;

  if (!newName || !garageID)
    return res.status(400).json({ message: "bad request" });

  await garageModel.findOneAndUpdate(
    { ID: garageID, owner: owner },
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

  await carModel.updateMany(
    { owner: owner, "garage.ID": garageID },
    {
      $set: {
        "garage.name": newName,
        "garage.desc": newDesc,
      },
    },
    (err, doc) => {
      if (err) console.log(err);
    }
  );

  res.status(201).send();
};

export const searchGarage = async (req, res, next) => {
  // Gives the garage(s) that matches with the query
  const searchQuery = req.query.q.toLowerCase();
  const owner = req.session.userId;

  let garages = await garageModel.find({ owner: owner }, "-_id -__v");

  let toSend = garages.filter(
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

  return res.status(200).json(toSend);
};
