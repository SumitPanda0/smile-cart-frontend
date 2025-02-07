const routes = {
  root: "/",
  products: {
    index: "/products", // listing route
    show: "/products/:slug", // individual product route
  },
  cart: "/cart",
  checkout: "/checkout",
};

export default routes;
