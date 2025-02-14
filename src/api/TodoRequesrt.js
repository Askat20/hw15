import axios from "axios";

export const BASE_URL = "https://e496476297eabad4.mokky.dev/todos";

export const getTodoRequest = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const postReques = async (item) => {
  try {
    const response = await axios.post(BASE_URL, item);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteReques = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};
