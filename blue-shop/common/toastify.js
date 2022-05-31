import { toast } from 'react-toastify';

const configurationToast = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const Toast = {

    toast: (message) => {
        toast(message, configurationToast);
    },

    success: (message) => {
        toast.success(message, configurationToast);
    },

    info: (message) => {
        toast.info(message, configurationToast);
    },

    warn: (message) => {
        toast.warn(message, configurationToast);
    },

    error: (message) => {
        toast.error(message, configurationToast);
    },

}

export default Toast