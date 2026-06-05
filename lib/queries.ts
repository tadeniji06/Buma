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

export const GET_RADIO_STATIONS = `
*[_type == "radioStation"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  "image": image.asset->url,
  coverage,
  programmes,
  listenership,
  spotAdvertPricing[] {
    timeBand,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    timeBand,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  jinglesPricing[] {
    timeBand,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  liveAppearancePricing[] {
    timeBand,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    timeBand,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  onAirHypePricing[] {
    timeBand,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  beltPricing[] {
    belt,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  }
}
`;

export const GET_INFLUENCERS = `
*[_type == "influencer"] | order(_createdAt desc) {
  _id,
  name,
  "image": image.asset->url,
  postPricing[] {
    name,
    description,
    pricing {
      currency,
      basePrice,
      priceWithMarkup
    }
  },
  igFollowers,
  facebookFollowers,
  ytSubscribers,
  ytViews,
  tiktokFollowers,
  category
}
`;
