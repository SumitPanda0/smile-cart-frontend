import { useState, memo } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import ProductQuantity from "components/commons/ProductQuantity";
import { Alert, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({ slug, imageUrl, offerPrice, mrp, name }) => {
  const removeCartItem = useCartItemsStore.pickFrom();
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">{t("mrp", { mrp })}</Typography>
          <Typography style="body2">
            {t("offerPrice", { offerPrice })}
          </Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel={t("removeItemConfirmation.button")}
            title={t("removeItemConfirmation.title")}
            message={
              <Trans
                i18nKey="removeItemConfirmation.message"
                values={{ name }}
              />
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItem(slug);
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
