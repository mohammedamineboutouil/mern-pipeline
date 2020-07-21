import axios from "axios";
import {UserModel} from "../../models/User";
import ErrorHandler from "../../helpers/error";
import env from "../../config";

// Initial Users data
export const initialUsersData = async (req, res, next) => {
    try {
        const countSoredUsers = await UserModel.countDocuments();
        if (countSoredUsers === 0)
            await initialUsers(100);
        else if (countSoredUsers !== 0 && countSoredUsers < 100)
            await initialUsers(100 - countSoredUsers);
        res.send({
            status: 200,
            results: 'data initializer with success'
        });
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});
        res.send({
            status: 200,
            results: users
        });
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Get One User By Id
export const getUserById = async (req, res, next) => {
    try {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            next(new ErrorHandler(404, 'Could not find this user!', null));
        }
        res.send({
            status: 200,
            results: user
        });
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Add New User
export const addNewUser = async (req, res, next) => {
    const {email} = req.body;
    try {
        let user = await UserModel.findOne({email});

        if (user) {
            next(new ErrorHandler(400, 'User already exists', null));
        }

        // Save User
        const storedUser = await new UserModel({
            ...req.body
        }).save();

        if (storedUser)
            res.send({
                status: 200,
                results: storedUser
            });
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Update User
export const updateUser = async (req, res, next) => {
    try {
        if (!req.params.id) {
            next(new ErrorHandler(404, 'Could not find this user!', null));
        }

        let user = await UserModel.findById(req.params.id);

        if (!user) {
            next(new ErrorHandler(404, 'Could not find this user!', null));
        }

        const {username, gender, dob, photo, news, email} = req.body;

        if (username) user.username = username;
        if (gender) user.gender = gender;
        if (photo) user.photo = photo;
        if (email) user.email = email;
        if (news) user.news = news;
        if (dob) user.dob = dob;

        user = await UserModel.findOneAndUpdate({_id: req.params.id}, user);

        res.send({
            status: 200,
            results: user
        });
    } catch (error) {
        console.error(error)
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Delete User
export const deleteUser = async (req, res, next) => {
    try {
        if (!req.params.id) {
            next(new ErrorHandler(404, 'Could not find this user!', null));
        }

        let user = await UserModel.findById(req.params.id);
        if (!user) {
            next(new ErrorHandler(404, 'Could not find this user!', null));
        }

        await UserModel.findOneAndDelete({_id: req.params.id});
        res.send({message: 'User Removed Success'});
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

const initialUsers = async count => {
    const {data} = await axios.get(`${env.USERS_API + count}`);
    for (const value of data.results.map(value => new UserModel({
        email: value.email,
        gender: value.gender,
        username: value.name.first + ' ' + value.name.last,
        dob: value.dob.date,
        photo: value.picture.large
    }))) {
        await value.save();
    }
}