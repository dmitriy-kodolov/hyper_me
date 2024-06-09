import { useCallback, useState, createContext, useContext } from "react";

import s from "./ToastrProvider.module.scss";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastrProvider = (props) => {
  const { children } = props;
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, duration = 120000) => {
    const id = Date.now();

    setToasts((prevToasts) => [...prevToasts, { id, message, duration }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className={s.toastContainer}>
        {toasts.map((toast) => (
          <div key={toast.id} className={s.toast}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastrProvider;
