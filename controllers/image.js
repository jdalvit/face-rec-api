const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
 });

const handleApiCall = async (req, res) => {
  try {
    const data = await clarifai.models
      .predict('e15d0f873e66047e579f90cf82c9882z', req.body.input);
      console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json('unable to work with API');
  }
}

const handleImage = async (req, res, db) => {
  const { id } = req.body;
  try {
    let ret = await db('users').returning('entries').where({ id }).increment('entries', 1);
    if (!ret.length) {
      throw 'error updating user entries'
    }
    res.json(ret[0]);
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  handleImage,
  handleApiCall
}