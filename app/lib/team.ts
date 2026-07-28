export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string | null;
  /** Short bio used on the team card. */
  bio: string;
  /** Longer bio for the full profile page, one paragraph per entry. */
  fullBio: string[];
  email: string;
  phone: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: "tyler-macchi",
    name: "Tyler Macchi",
    role: "Team Lead",
    image: "/images/team/tyler-macchi.jpg",
    bio: "Born and raised in Southwest Florida, Tyler brings unmatched local knowledge to every conversation about the coast. He guides clients through Naples, Bonita Springs, and Fort Myers with the perspective only a native can offer.",
    fullBio: [
      "Born and raised in Southwest Florida, Tyler brings unmatched local knowledge to every conversation about the coast. He guides clients through Naples, Bonita Springs, and Fort Myers with the perspective only a native can offer.",
      "Tyler founded The Macchi Group on a simple idea: real estate should feel like a partnership, not a transaction. That philosophy shapes how the team works with every client, from a first-time coastal buyer to a family selling a longtime waterfront home.",
      "When he's not with clients, Tyler is usually out on the water himself — time that keeps him close to the neighborhoods, docks, and communities he represents.",
    ],
    email: "tyler@themacchigroup.com",
    phone: "(239) 825-0700",
  },
  {
    slug: "brandon-shirk",
    name: "Brandon Shirk",
    role: "Sales Executive",
    image: "/images/team/brandon-shirk.jpg",
    bio: "Brandon's years inside some of the country's most exclusive golf clubs shaped a rare fluency in luxury lifestyles and private club living. He brings that insight to every client seeking more than just a home.",
    fullBio: [
      "Brandon's years inside some of the country's most exclusive golf clubs shaped a rare fluency in luxury lifestyles and private club living. He brings that insight to every client seeking more than just a home.",
      "That background gives Brandon an intuitive read on what matters most to buyers moving into Southwest Florida's private club and country club communities — from course access and membership tiers to the quieter details that don't show up in a listing.",
      "Brandon works closely with each client to translate that lifestyle knowledge into a search that's actually about how they want to live, not just square footage.",
    ],
    email: "brandon@themacchigroup.com",
    phone: "(239) 825-0700",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM.find((member) => member.slug === slug);
}
