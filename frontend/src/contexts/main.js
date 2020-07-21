import React, {createContext, useState} from "react";
import {asyncHandler} from "../utils";
import axios from "axios";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [state, setState] = useState({
        current: null,
        status: null,
        filtered: [],
        users: [],
    });

    const initialData = asyncHandler(async () => {
        return await axios.post('/users/mock').then(() => {
            return "success";
        })
    });

    const allUsers = asyncHandler(async () => {
        return await axios.get('/users')
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    users: res.data.results,
                    status: res.data.status
                }));
                return "success";
            })
    });

    const userById = asyncHandler(async id => {
        return await axios.get(`/users/${id}`)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    status: res.data.status,
                    current: res.data.results
                }));
                return "success";
            })
    });

    const addNewUser = asyncHandler(async formData => {
        return await axios.post('/users', formData)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    status: res.data.status,
                    users: [...prevState.users, res.data.results]
                }));
                return "success";
            })
    });

    const editUser = asyncHandler(async (formData) => {
        const id = formData._id;
        return await axios.put(`/users/${id}`, formData)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    status: res.data.status,
                    users: prevState.users.map(user =>
                        user._id === id ? res.data.results : user
                    ),
                }));
                return "success";
            })
    });

    const deleteUserById = asyncHandler(async id => {
        return await axios.delete(`/users/${id}`)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    status: res.data.status,
                    users: prevState.users.filter(user => user._id !== id)
                }));
                return "success";
            })
    });

    const setCurrent = current => {
        setState(prevState => ({
            ...prevState,
            current,
        }));
    };

    const clearCurrent = () => {
        setState(prevState => ({
            ...prevState,
            current: null,
        }));
    };

    const filterUsers = payload => {
        setState(prevState => ({
            ...prevState,
            filtered: prevState.users.filter(user => {
                const regex = new RegExp(`${payload}`, 'gi');
                return user.username.match(regex) || user.email.match(regex);
            })
        }));
    };

    const clearFilter = () => {
        setState(prevState => ({
            ...prevState,
            filtered: [],
        }));
    };

    return (
        <AppContext.Provider value={{
            ...state,
            addNewUser,
            allUsers,
            userById,
            editUser,
            setCurrent,
            clearCurrent,
            deleteUserById,
            filterUsers,
            clearFilter,
            initialData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};