/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { PageLoader } from "components/commons";
import Header from "components/commons/Header";
import { MRP, OFFER_PRICE } from "components/constants";
import ProductCard from "components/ProductCard";
import { cartTotalOf } from "components/utils";
import { NoData, Toastr } from "neetoui";
import { isEmpty, keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";

const Cart = () => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);
  const slugs = keys(cartItems);
  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );
      //   console.log(responses);
      setProducts(responses);
      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      });
    } catch (err) {
      console.log(t("error.genericError", { err }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);
  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <>
        <Header title={t("cart.title")} />
        <div className="flex h-screen items-center justify-center">
          <NoData title={t("cart.empty")} />
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={t("cart.title")} />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
