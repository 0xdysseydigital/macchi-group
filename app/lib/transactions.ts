export type Transaction = {
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
};

// Placeholder listings for wireframing — swap in real closed transactions before launch.
export const TRANSACTIONS: Transaction[] = [
  {
    address: "412 Seagrove Ln",
    city: "Naples, FL",
    price: "$3,250,000",
    beds: 4,
    baths: 4.5,
    sqft: "4,820",
  },
  {
    address: "88 Harbourview Dr",
    city: "Bonita Springs, FL",
    price: "$1,890,000",
    beds: 3,
    baths: 3,
    sqft: "3,110",
  },
  {
    address: "215 Palmetto Course Rd",
    city: "Fort Myers, FL",
    price: "$2,475,000",
    beds: 4,
    baths: 4,
    sqft: "3,960",
  },
  {
    address: "1601 Gulfshore Way",
    city: "Naples, FL",
    price: "$5,600,000",
    beds: 5,
    baths: 5.5,
    sqft: "6,340",
  },
  {
    address: "74 Estuary Point",
    city: "Bonita Springs, FL",
    price: "$1,325,000",
    beds: 3,
    baths: 2.5,
    sqft: "2,640",
  },
  {
    address: "930 Sanderling Cove",
    city: "Fort Myers Beach, FL",
    price: "$2,150,000",
    beds: 3,
    baths: 3,
    sqft: "2,980",
  },
];
