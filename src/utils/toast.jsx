import { toast } from 'react-toastify';

export const toastSucess = (text) => {
  toast.success(text, {
    position: "bottom-left",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
}

export const toastError = (text) => {
  toast.error(text, {
    position: "bottom-left",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });
}