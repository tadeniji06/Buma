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
    duration,
    timeBand,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    wordCount,
    timeBand,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  jinglesPricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  liveAppearancePricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  onAirHypePricing {
    currency,
    priceWithMarkup
  },
  "onAirHypePricingItems": onAirHypePricing[] {
    duration,
    timeBand,
    wordCount,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  beltPricing[] {
    belt,
    pricing {
      currency,
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
