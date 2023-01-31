const { User, Thought } = require("../models");

const UserController = {
  //Get all the users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Create an a user
  CreateUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  //Update User by Id
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        !user ? res.status(404).json({ message: "No user" }) : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete User by Id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({
              _id: {
                $in: user.thoughts,
              },
            })
      )
      .then(() => res.json({ message: "User and associated apps deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Get user by id

  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that Id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a friend
  addFriend(req, res) {
    console.log("You are adding a friend");

    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend found with that Id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = UserController;
