import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => response,
  (error) => toast.error("Couldn't connect to the server, please try again later.")
);
