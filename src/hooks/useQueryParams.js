import { keysToCamelCase } from "neetocist";
import { parse } from "qs";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const queryParams = parse(location.search, { ignoreQueryPrefix: true });

  return keysToCamelCase(queryParams);
};

export default useQueryParams;

/*
We will use useLocation hook from the react-router-dom to retrieve the details of the current URL. We can pick the search property from it to get the query param as a string: "?page=2&page_size=8". Then we'll employ the parse function from qs library to process the key-value pairs in the query string into an object. It supports ignoreQueryPrefix flag to ignore the leading question mark in the query param string. We will also use the keysToCamelCase function to convert the keys of the parameter object from snake_case to camelCase
*/
