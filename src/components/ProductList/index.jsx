import React, { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "./constant";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);
  const productsParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };
  const { t } = useTranslation();
  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);
  // const fetchProducts = async () => {
  //   try {
  //     const { products } = await productsApi.fetch({
  //       searchTerm: debouncedSearchKey,
  //     });
  //     setProducts(products);
  //     // console.log(response);
  //   } catch (err) {
  //     console.log(t("error.genericError", { err }));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedSearchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  // console.log(products)
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header
          shouldShowBackButton={false}
          title={t("title")}
          actionBlock={
            <Input
              placeholder={t("searchProducts")}
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={e => {
                setSearchKey(e.target.value);
                setCurrentPage(DEFAULT_PAGE_INDEX);
              }}
            />
          }
        />
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title={t("noData")} />
        ) : (
          <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductListItem key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default withTitle(ProductList);
