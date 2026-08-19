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

export const GET_TV_STATIONS = `
*[_type == "tvStation"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  category,
  viewership,
  programmes,
  coverage,
  runOfSpotPricing[] {
    duration,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  advertSpotPricing[] {
    duration,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  liveCoveragePricing[] {
    name,
    description,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  guestAppearancePricing[] {
    name,
    description,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    name,
    description,
    pricing {
      currency,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    name,
    description,
    pricing {
      currency,
      priceWithMarkup
    }
  }
}
`;

export const GET_NEWS_OUTLETS = `
*[_type == "newsOutlet"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  category,
  reach,
  coverage,
  placements[] {
    name,
    description,
    pricing {
      currency,
      priceWithMarkup
    }
  }
}
`;

export const GET_PR_AGENCIES = `
*[_type == "prAgency"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  category,
  coverage,
  services[] {
    name,
    description,
    pricing {
      currency,
      priceWithMarkup
    }
  }
}
`;
