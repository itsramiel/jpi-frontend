export interface LocaleSegmentProps {
  params: { locale: string };
}

export type TProject = {
  id: number;
  attributes: {
    name: string;
    city: string;
    description: string;
    locale: string;
    underConstruction: boolean;
    downPaymentPercentage: number;
    fullPaymentDiscount: boolean;
    coordinates: { id: number; latitude: number; longitude: number };
    amenities: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          locale: string;
        };
      }>;
    };
    nearbyPOI: Array<{
      id: number;
      name: string;
      distance: number;
      unit: string;
    }>;
    images: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
        };
      }>;
    };
    properties: {
      data: Array<TProperty>;
    };
  };
};

export type TProperty = {
  id: number;
  attributes: {
    name: string;
    locale: string;
    price: number;
    features: Array<string>;
    bedroomCount: number;
    property_type: {
      data: TPropertyType;
    };
    currency: {
      data: {
        id: number;
        attributes: {
          code: string;
        };
      };
    };
  };
};

export type TPropertyType = {
  id: number;
  attributes: {
    displayName: string;
    locale: string;
  };
};
