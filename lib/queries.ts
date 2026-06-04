export const GET_BILLBOARDS = `
*[_type == "billboard"] | order(_createdAt desc) {
  _id,
  name,
  "image": images[0].asset->url,
  "images": images[].asset->url,
  description,
  displayType,
  billboardSize,
  billboardDimensions,
  availability,
  country,
  cityState,
  pricing {
    currency,
    basePrice,
    priceWithMarkup
  }
}
`;
