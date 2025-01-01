import React from 'react'
import { useTranslation } from 'react-i18next'

import { SlGlobe } from "react-icons/sl"

import styles from '../styles/LanguageToggle.module.scss'


export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button className={styles.button} onClick={handleLanguageToggle}>
      <SlGlobe size={24} />
    </button>
  );
};

