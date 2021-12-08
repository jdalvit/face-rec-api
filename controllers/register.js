const handleRegister = async (req, res, db, bcrypt) => {
  const {email, name, password} = req.body;
  if (!email || !name || !password) {
    console.log(email, name, password)
    return res.status(400).json('incorrect form submission');
  }
  let hash = await bcrypt.hash(password, 10);
  try {
    // Register new user in 'users' and 'login' tables as part of an SQL transaction
    let user = []
    await db.transaction(async trx => {
      user = await trx('users')
        .returning('*')
        .insert({
          email: email,
          name: name,
          joined: new Date()
        })
      await trx('login')
        .insert({
          email: user[0].email,
          hash: hash
        })
    })
    res.json(user[0]);
    // Knex automatically commits the transaction if no errors were catched
  } catch (err) {
    console.log(err);
    res.status(400).json('error registering user');
  }
}

module.exports = {
  handleRegister: handleRegister
}