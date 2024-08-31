const BASE_URL = 'https://loved-kindness-f299118583.strapiapp.com'; // replace with your actual API URL

export const endpoints = {
  categories: BASE_URL + '/api/categories?populate=*',
  products:
    BASE_URL +
    '/api/product?populate[banner]=*&populate[category][populate][banner]=*?pagination[page]=1&pagination[pageSize]=50',
};
