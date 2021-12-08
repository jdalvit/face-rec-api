const handleSignin = async (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(email, password)
    return res.status(400).json('incorrect form submission');
  }
  try {
    const data = await db.select('email', 'hash').from('login').where({'email': email});
    const didMatch = await bcrypt.compare(password, data[0].hash);
    if (didMatch) {
      const user = await db.select('*').from('users').where({'email': email});
      res.json(user[0]);
    } else {
      res.status(400).json('wrong credentials')
    }
  } catch (err) {
    console.log(err)
    res.status(400).json('error getting user')
  }
}

module.exports = {
  handleSignin: handleSignin
}