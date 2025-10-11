export const GET_VENDORS_WITH_BILLBOARDS = `
*[_type == "vendor"]{
  _id,
  name,
  regions[] {
    name,
    billboards[] {
      area,
      size,
      status,
      "image": images[0].asset->url,
      description
    }
  }
}
`;
