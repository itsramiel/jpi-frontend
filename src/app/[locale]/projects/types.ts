export type TProject = {
  id: number;
  attributes: {
    name: string;
    city: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    images: Array<string>;
    coordinates: { id: number; latitude: number; longitude: number };
    amenities: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          locale: string;
        };
      }>;
    };
    propertyTypes: Array<{
      id: number;
      property: {
        category: string;
        name: string;
        features: Array<string>;
      };
    }>;
    nearbyPOI: Array<{
      id: number;
      name: string;
      distance: number;
      unit: string;
    }>;
    pricing: {
      id: number;
      startingPrice: number;
      DownPayment: number;
      fullPaymentDiscount: boolean;
      currency: string;
    };
  };
};
