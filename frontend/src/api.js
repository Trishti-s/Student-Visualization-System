import axios from "axios";

export const predictClass = async (Data) => {
  const res = await axios.post("http://localhost:5000/predict", Data);
  return res.data;
};
