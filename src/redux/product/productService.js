import axios from "axios";

const getProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/product/${id}`);

  return data.product;
};

const productService = {
  getProduct,
};

export default productService;
