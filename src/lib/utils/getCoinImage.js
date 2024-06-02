export const getCoinImage = (name) => {
  return new URL(`../../assets/${name}`, import.meta.url).href;
};
