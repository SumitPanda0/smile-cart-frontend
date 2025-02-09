import { useRef } from "react";

import { VALID_COUNT_REGEX } from "components/constants";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Input, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "./TooltipWrapper";

const ProductQuantity = ({ slug }) => {
  const countInputFocus = useRef(null);
  const { t } = useTranslation();
  const { data: product = {} } = useShowProduct(slug);
  const { availableQuantity } = product;

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity; //   console.log(paths([["cartItems", slug], ["setSelectedQuantity"]]));
  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      const errorMessage = t("error.quantityLimit", {
        count: availableQuantity,
      });
      Toastr.error(errorMessage, { autoClose: 2000 });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={preventNavigation}
      />
      {/* {selectedQuantity} */}
      <TooltipWrapper
        content={t("reachedMaximumUnits")}
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={e => {
            preventNavigation(e);
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
