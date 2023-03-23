var api = process.env.NODE_ENV !== "production" ?  "http://localhost:5000/api" : "https://e-commerce-first-api-qeof.onrender.com/api";
export const authUrl = `${api}/auth/`;
export const productUrl = `${api}/product/`;
export const userUrl = `${api}/user/`;
export const bannerUrl = `${api}/banner/`;
export const brandUrl = `${api}/brand/`;
export const categoryUrl = `${api}/category/`;
export const orderUrl = `${api}/order/`;
export const postUrl = `${api}/post/`;
