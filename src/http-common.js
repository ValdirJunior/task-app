import axios from "axios";

export default axios.create({
  baseURL: "https://morning-plains-03172.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});