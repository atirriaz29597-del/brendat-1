export const STATE_FEES: Record<string, number> = {
  Alabama: 236, Alaska: 250, Arizona: 50, Arkansas: 45, California: 70,
  Colorado: 50, Connecticut: 120, Delaware: 90, Florida: 125, Georgia: 100,
  Hawaii: 50, Idaho: 100, Illinois: 150, Indiana: 95, Iowa: 50, Kansas: 160,
  Louisiana: 75, Maine: 175, Maryland: 100, Massachusetts: 500, Michigan: 50,
  Minnesota: 155, Mississippi: 50, Missouri: 50, Montana: 70, Nebraska: 105,
  Nevada: 75, "New Hampshire": 100, "New Jersey": 125, "New Mexico": 50,
  "New York": 200, "North Carolina": 125, "North Dakota": 135, Ohio: 99,
  Oklahoma: 100, Oregon: 100, Pennsylvania: 125, "Rhode Island": 150,
  "South Carolina": 110, "South Dakota": 150, Tennessee: 300, Texas: 300,
  Utah: 72, Vermont: 125, Virginia: 100, Washington: 200, "Washington DC": 220,
  "West Virginia": 100, Wisconsin: 130, Wyoming: 100,
};

export const packagePrices: Record<string, number> = {
  Basic: 0,
  Standard: 149,
  Premium: 299,
};

export const comparisonFeatures: {
  label: string;
  sub?: string;
  basic: string;
  standard: string;
  premium: string;
}[] = [
  { label: "Preparing & Filing the Articles of Organization", sub: "See what's included →", basic: "✓", standard: "✓", premium: "✓" },
  { label: "FREE 1st Year Registered Agent Service!", basic: "✓", standard: "✓", premium: "✓" },
  { label: "FREE 1st Month of Virtual Address Service!", basic: "—", standard: "✓", premium: "✓" },
  { label: "Expedited Filing", sub: "2 business days (instead of 1-2 weeks)", basic: "+ $50", standard: "+ $50", premium: "✓" },
  { label: "Business Contract Templates", basic: "+ $150", standard: "+ $150", premium: "✓" },
  { label: "EIN Business Tax Number", basic: "+ $70", standard: "✓", premium: "✓" },
  { label: "Operating Agreement", basic: "+ $99", standard: "✓", premium: "✓" },
  { label: "Domain Name + Business Email", basic: "—", standard: "—", premium: "✓" },
  { label: "FREE 1st Year Business Phone Number", sub: "*Offer valid only for US based clients.", basic: "—", standard: "—", premium: "✓" },
  { label: "Lifetime Compliance Alerts", basic: "—", standard: "✓", premium: "✓" },
  { label: "Unlimited Phone & Email Support", basic: "—", standard: "✓", premium: "✓" },
  { label: "Online Access Dashboard", basic: "✓", standard: "✓", premium: "✓" },
  { label: "Business Banking Account Offer", basic: "✓", standard: "✓", premium: "✓" },
  { label: "Business Tax Consultation", basic: "—", standard: "✓", premium: "✓" },
  { label: "IRS Form 2553", basic: "+ $50", standard: "—", premium: "✓" },
];
