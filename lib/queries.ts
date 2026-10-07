export const GET_BILLBOARDS = `
*[_type == "billboard"] | order(_createdAt desc) {
  _id,
  name,
  agency,
  "image": images[0].asset->url,
  "images": images[].asset->url,
  description,
  displayType,
  billboardSize,
  billboardDimensions,
  availability,
  country,
  state,
  city,
  cityState,
  latitude,
  longitude,
  contactPerson,
  contactPersonEmail,
  contactPersonPhone,
  companyEmail,
  companyPhone,
  pricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  }
}
`;

export const GET_RADIO_STATIONS = `
*[_type == "radioStation"] | order(_createdAt desc) {
  _id,
  name,
  frequency,
  "logo": logo.asset->url,
  "image": image.asset->url,
  transmissionType,
  coverage,
  programmes,
  programmeType,
  language,
  location,
  mediaOwner,
  website,
  stationManager,
  contactPerson,
  role,
  listenership,
  spotAdvertPricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    wordCount,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  jinglesPricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  liveAppearancePricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  onAirHypePricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  "onAirHypePricingItems": onAirHypePricing[] {
    duration,
    timeBand,
    wordCount,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  beltPricing[] {
    belt,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
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
  location,
  language,
  contentCategory,
  platform,
  manager,
  managementTeam,
  managementEmail,
  postPricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
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

export const GET_TV_STATIONS = `
*[_type == "tvStation"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  category,
  transmissionType,
  advertType,
  mediaOwner,
  ownershipGroup,
  website,
  stationManager,
  contactPerson,
  role,
  phoneNumber,
  email,
  programmes,
  coverage,
  runOfSpotPricing[] {
    duration,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  advertSpotPricing[] {
    duration,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  liveCoveragePricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  guestAppearancePricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  }
}
`;

export const GET_PR_MEDIA = `
*[_type in ["prMedia", "prAgency", "newsOutlet"]] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  mediaCategories,
  category,
  coverage,
  location,
  contentCategory,
  audienceType,
  publicNoticeBlackPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  productsColourPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  productsBlackPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  politicsColorPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  politicsBlackPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  allureRatePricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  specialPositions[] {
    position,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  customPackages[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  services[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  placements[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  website,
  companyEmail,
  companyPhone,
  contactPerson,
  role
}
`;

export const GET_NEWS_OUTLETS = GET_PR_MEDIA;
export const GET_PR_AGENCIES = GET_PR_MEDIA;
