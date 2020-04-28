// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');
const User = require('../models/users');
const passport = require('passport');

async function signUp(request, response){
  User.register(new User({
      username: request.body.username
    }),
    request.body.password, (err, user) => {
      if (err) {
        console.log("err rbp: ", err.message);
        response.statusCode = 500;

        response.setHeader('Content-Type', 'application/json');
        response.json({
          err: err
        });
      } else {
        console.log("in else")
        passport.authenticate('local')(request, response, () => {
          User.findOne({
            username: request.body.username
          }, (err, person) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json({
              success: true,
              status: 'Registration Successful!',
            });
          });
        })
      }
    })
};

async function login(request, response){
  User.findOne({
    username: request.body.username
  }, (err, person) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.json({
      success: true,
      status: 'You are successfully logged in!'
    });
  })
};

async function logOut(req, res){
  if (req.session) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('session-id');
        res.json({
          message: 'You are successfully logged out!'
        });
      }
    });
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
};

async function addUser(request, response){
    const user = new User({
      username: request.body.username,
      password: request.body.password

    })
    try{
      const newUser = await user.save()
      response.status(201).json(newUser)
      //response.redirect('/'+ request.params.roomName)
    }
    catch(err){
      console.log(err);
      response.status(400).json({message: err.message})
    }

  }

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
}

module.exports = {
    getRoom,
    addUser,
    signUp, 
    login,
    logOut
};