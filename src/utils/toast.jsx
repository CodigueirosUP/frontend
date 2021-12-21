import { toast } from 'react-toastify';

const defaultToastStyle =  {
  position: "bottom-left",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
}

export const toastSucess = (text) => {
  toast.success(text, defaultToastStyle);
}

export const toastError = (text) => {
  toast.error(text, {...defaultToastStyle, autoClose: 5000});
}



// Exemplo para editar as condições do toast, caso queira um "alert" diferente do outro:



// export const toastSucess = (text) => {
//   toast.success(text, {...defaultToastStyle, position: 'top-right'});
// }