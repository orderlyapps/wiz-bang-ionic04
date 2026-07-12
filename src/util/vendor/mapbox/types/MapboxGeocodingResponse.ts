export type MapboxGeocodingResponse = {
  attribution: string;
  type: string;
  features: MapboxGeocodingFeature[];
};

export type MapboxGeocodingFeature = {
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
    type: "Point";
  };
  id: string;
  properties: {
    bbox?: [number, number, number, number];
    context: {
      country?: {
        country_code: string;
        country_code_alpha_3: string;
        mapbox_id: string;
        name: string;
        wikidata_id: string;
      };
      place?: {
        mapbox_id: string;
        name: string;
        wikidata_id: string;
      };
      postcode?: {
        mapbox_id: string;
        name: string;
      };
      region?: {
        mapbox_id: string;
        name: string;
        region_code: string;
        region_code_full: string;
        wikidata_id: string;
      };
      street?: {
        mapbox_id: string;
        name: string;
      };
    };
    coordinates: {
      accuracy?: string;
      longitude: number;
      latitude: number;
      routable_points?: {
        latitude: number;
        longitude: number;
        name: string;
      }[];
    };
    feature_type: string;
    full_address: string;
    mapbox_id: string;
    match_code: {
      address_number: string;
      confidence: string;
      country: string;
      locality: string;
      place: string;
      postcode: string;
      region: string;
      street: string;
    };
    name: string;
    name_preferred: string;
    place_formatted: string;
  };
  type: "Feature";
};
