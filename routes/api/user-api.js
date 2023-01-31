const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  CreateUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controllers");

router.route("/").get(getAllUsers).post(CreateUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
