import { ToastContainer } from "react-toastify";

export const Toast = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      theme="colored"
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
