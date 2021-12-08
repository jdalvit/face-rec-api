const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users')
    .where({
      id
      //same as id: id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('user not found')
      }
    })
    .catch(err => {
      res.status(400).json('error getting user');
      console.log(err);
    });
  // if (!found) {
  //   res.status(404).json('not found');
  // }
}

module.exports = {
  handleProfile: handleProfile
}