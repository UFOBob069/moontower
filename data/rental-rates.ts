export interface RentalRate {
  zipCode: string;
  city: string;
  state: string;
  baseRate: number;  // Base rate per bedroom
  occupancyRate: number;  // Average occupancy rate (0-1)
  seasonalFactors?: {
    winter: number;
    spring: number;
    summer: number;
    fall: number;
  }
}

export const rentalRates: RentalRate[] = [
  // Austin, TX
  {
    zipCode: "78701",
    city: "Austin",
    state: "TX",
    baseRate: 2200,
    occupancyRate: 0.92,
    seasonalFactors: {
      winter: 0.95,
      spring: 1.05,
      summer: 1.15,
      fall: 1.0
    }
  },
  {
    zipCode: "78704",
    city: "Austin",
    state: "TX",
    baseRate: 1900,
    occupancyRate: 0.90
  },
  // Denver, CO
  {
    zipCode: "80202",
    city: "Denver",
    state: "CO",
    baseRate: 2100,
    occupancyRate: 0.88
  },
  {
    zipCode: "80206",
    city: "Denver",
    state: "CO",
    baseRate: 1950,
    occupancyRate: 0.87
  },
  // Seattle, WA
  {
    zipCode: "98101",
    city: "Seattle",
    state: "WA",
    baseRate: 2400,
    occupancyRate: 0.91
  },
  {
    zipCode: "98104",
    city: "Seattle",
    state: "WA",
    baseRate: 2200,
    occupancyRate: 0.89
  },
  // San Francisco, CA
  {
    zipCode: "94102",
    city: "San Francisco",
    state: "CA",
    baseRate: 3200,
    occupancyRate: 0.93
  },
  {
    zipCode: "94110",
    city: "San Francisco",
    state: "CA",
    baseRate: 2900,
    occupancyRate: 0.92
  },
  // New York, NY
  {
    zipCode: "10001",
    city: "New York",
    state: "NY",
    baseRate: 3500,
    occupancyRate: 0.94
  },
  {
    zipCode: "11201",
    city: "Brooklyn",
    state: "NY",
    baseRate: 2800,
    occupancyRate: 0.92
  },
  // Default rate if ZIP not found
  {
    zipCode: "default",
    city: "Other",
    state: "--",
    baseRate: 1500,
    occupancyRate: 0.85
  }
];

// Helper function to get rental rate by ZIP code
export const getRentalRateByZip = (zipCode: string): RentalRate => {
  return rentalRates.find(rate => rate.zipCode === zipCode) || 
         rentalRates.find(rate => rate.zipCode === "default")!;
}; 