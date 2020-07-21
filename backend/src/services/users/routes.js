import express from "express";
import {addNewUser, deleteUser, getAllUsers, getUserById, initialUsersData, updateUser} from "./controller";

const router = express.Router();

router
    .route('/')
    .get(getAllUsers);

router
    .route('/:id')
    .get(getUserById);

router
    .route('/')
    .post(addNewUser);

router
    .route('/mock')
    .post(initialUsersData);

router
    .route('/:id')
    .put(updateUser);

router
    .route('/:id')
    .delete(deleteUser);

export default router;
