import React, { useEffect, useCallback } from "react";
import hoistStatics from "hoist-non-react-statics";
import { isEmpty } from "lodash";
import { translationsActions } from "../reducers/translations";
import { useDispatch, useSelector } from "react-redux";
import { loadTranslation } from "../constants/translations/translationHelper";
import { getTranslationFile } from "../utils/utilFunctions";

// A public higher-order component to access translations
let initStart = true;
const withTranslations = (SourceComponent, ComponentName) => {
  if (ComponentName === undefined) {
    ComponentName =
      SourceComponent.displayName || SourceComponent.name || "Component";
  }

  function TranslatableComponent(props) {
    const dispatch = useDispatch();
    const { translations } = useSelector((state) => state.translations);
    const { appName, appLocale } = useSelector((state) => state.user.appInfo);

    const translationImportHandler = useCallback(async () => {
      const translation = loadTranslation(`${appName}_${appLocale}`);

      if (translation) {
        dispatch(translationsActions.setTranslations(translation));
      }
    }, [dispatch]);

    useEffect(() => {
      if (initStart) {
        initStart = false;
        isEmpty(translations) && translationImportHandler();
        return;
      }
    }, [translationImportHandler, translations]);

    return <SourceComponent t={translations[ComponentName]} {...props} />;
  }

  TranslatableComponent.displayName = `withTranslations(${ComponentName})`;
  return hoistStatics(TranslatableComponent, SourceComponent);
};

export default withTranslations;
