import React, { useEffect, useState } from "react";
import hoistStatics from "hoist-non-react-statics";
import { useSelector, useDispatch } from "react-redux";
import { translationsActions } from "../reducers/translations";
import { getTranslationFile } from "./utilFunctions";

// A public higher-order component to access translations
let initStart = true;
const withTranslations = (SourceComponent, ComponentName) => {
  if (ComponentName === undefined) {
    ComponentName =
      SourceComponent.displayName || SourceComponent.name || "Component";
  }

  function TranslatableComponent(props) {
    const dispatch = useDispatch();
    const { translations } = useSelector((state) => state.translationsReducer);
    const [loadedTranslations, setLoadedTranslations] = useState(false);

    useEffect(() => {
      if (initStart) {
        initStart = false;
        if (!translations) {
          loadTranslations(); // Load translations if they haven't been loaded yet
        }
      }
    }, [loadTranslations, translations]);

    const loadTranslations = async () => {
      try {
        const fileName = getTranslationFile();
        const { translation } = await import(
          `../constants/translations/${fileName}`
        );
        dispatch(translationsActions.setTranslations(translation));
        setLoadedTranslations(true);
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };

    if (!loadedTranslations) {
      // Loading indicator
      return null;
    }

    return <SourceComponent t={translations[ComponentName]} {...props} />;
  }

  TranslatableComponent.displayName = `withTranslations(${ComponentName})`;
  return hoistStatics(TranslatableComponent, SourceComponent);
};

export default withTranslations;
