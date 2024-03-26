import axios from "axios";

export const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axios.post('http://127.0.0.1:5000/upload', formData);
      return response.data.url;
    } catch (error) {
      throw error;
    }
  };