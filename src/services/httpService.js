import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const instance = axios.create();

const toast_id = "toast_1fgd2";

instance.interceptors.response.use(null, (error) => {
  toast.error(`Something went wrong!`, { toastId: toast_id });
  console.error(error);
  Promise.reject(error);
});

export default instance;
