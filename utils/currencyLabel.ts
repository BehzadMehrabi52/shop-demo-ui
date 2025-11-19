export const getCurrencyLabel = (currency: string, lang: string) => {
  const map: any = {
    USD: {
      en: "US Dollar",
      fa: "دلار آمریکا",
      tr: "Amerikan Doları",
    },
    TRY: {
      en: "Turkish Lira",
      fa: "لیر ترکیه",
      tr: "Türk Lirası",
    },
    IRR: {
      en: "Iranian Rial",
      fa: "ریال ایران",
      tr: "İran Riyali",
    },
  };

  return map[currency]?.[lang] || currency;
};
