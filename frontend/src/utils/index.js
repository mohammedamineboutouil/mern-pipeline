import {isEmpty} from "./validator";
import {notification} from "antd";

export const camelCaseToNormal = value =>
    value.replace(/([A-Z])/g, ' $1').replace(/^./, str2 => str2.toUpperCase());

export const asyncHandler = fn => (formData) =>
    Promise.resolve(fn(formData));

export const errorResponseHandler = err => {
    return err.response && err.response.data && err.response.data.message && !isEmpty(err.response.data.message) ? err.response.data.message : 'Sorry, something went wrong. Please try again later.';
};

export const openNotification = ({type, message}) => {
    notification[type]({
        message,
    });
};