const { User } = require("../models/User.js");

const getUser = async (req, res) => {
    try {

        const { id } = req.params;

        console.log(id);

        const user = await User.findById(id);

        console.log(user.firstName);

        res.status(200).json(user);

    } catch (error) {
        console.log({ msg: `${error.message} getUserId` });
        res.status(404).json({ msg: error.message });
    }
}

const getUserFriends = async (req, res) => {

    try {

        const { id } = req.params;

        console.log(id);

        const user = await User.findById(id);

        console.log(user.id);

        const friends = await Promise.all(user.friends.map(id => User.findById(id)));

        console.log(friends);

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => { return { _id, firstName, lastName, occupation, location, picturePath } });

        res.status(200).json(formattedFriends);

    } catch (error) {
        console.log({ msg: error.message });
        res.status(404).json({ msg: error.message });
    }

}

/* Update */
const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        console.log(`id: ${id} frienId:${friendId}`);

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        console.log(`user: ${user.firstName} friend: ${friend.firstName}`);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((userId) => userId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(user.friends.map(id => User.findById(id)));

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => { return { _id, firstName, lastName, occupation, location, picturePath } });

        console.log(formattedFriends);

        res.status(200).json(formattedFriends);


    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
}

module.exports = { getUser, getUserFriends, addRemoveFriend };