var User   = require('../models/user');

function usersIndex(req, res) {
  console.log("I am a request:")
  console.log(req)
  User.find(function(err, users){
    console.log("*************************")
    console.log(users)
    console.log("*************************")
    if (err) return res.status(404).json({ message: 'Something went wrong.' });
    res.status(200).json({ users: users });
  });
}

function usersShow(req, res){
  console.log("I AM USERS SHOW")
  User.findById(req.params.id, function(err, user){
    if (err) return res.status(404).json({ message: 'Something went wrong.' });
    res.status(200).json({ user: user });
  });
}

function usersUpdate(req, res){
  User.findByIdAndUpdate({ _id: req.params.id }, req.body.user, { new: true }, function(err, user){
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json(err);
    res.status(200).json({ user: user });
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove({ _id: req.params.id }, function(err){
   if (err) return res.status(404).json({ message: 'Something went wrong.' });
   res.status(200).json({ message: 'User has been successfully deleted' });
  });
}

module.exports = {
  index:  usersIndex,
  show:   usersShow,
  update: usersUpdate,
  delete: usersDelete
}
