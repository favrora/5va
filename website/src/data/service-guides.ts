type ServiceGuide = {
  label: string;
  href: `/blog/${string}`;
};

const compareCosts: ServiceGuide = {
  label: 'Compare your repair and replacement costs',
  href: '/blog/appliance-repair-or-replace/#repair-or-replace-calculator',
};

export const serviceGuides: Record<string, ServiceGuide[]> = {
  'refrigerator-repair': [
    { label: 'Refrigerator not cooling', href: '/blog/refrigerator-not-cooling/' },
    { label: 'Refrigerator leaking water', href: '/blog/refrigerator-leaking-water/' },
    {
      label: 'Refrigerator making an unusual noise',
      href: '/blog/refrigerator-making-noise-philadelphia/',
    },
    { label: 'What affects refrigerator repair cost', href: '/blog/refrigerator-repair-cost/' },
  ],
  'washer-repair': [
    { label: 'Washer not draining', href: '/blog/washer-not-draining/' },
    { label: 'Washer not spinning', href: '/blog/washer-not-spinning-philadelphia/' },
    { label: 'Washer leaking water', href: '/blog/washer-leaking-water-philadelphia/' },
    {
      label: 'What affects washing machine repair cost',
      href: '/blog/washing-machine-repair-cost/',
    },
  ],
  'dryer-repair': [
    { label: 'Dryer not heating', href: '/blog/dryer-not-heating-philadelphia/' },
    { label: 'Dryer won’t start', href: '/blog/dryer-wont-start/' },
    { label: 'What affects dryer repair cost', href: '/blog/dryer-repair-cost/' },
  ],
  'oven-stove-repair': [
    { label: 'Oven not heating', href: '/blog/oven-not-heating/' },
    compareCosts,
  ],
  'dishwasher-repair': [
    { label: 'Dishwasher not draining', href: '/blog/dishwasher-not-draining/' },
    { label: 'Dishwasher not cleaning dishes', href: '/blog/dishwasher-not-cleaning/' },
    { label: 'What affects dishwasher repair cost', href: '/blog/dishwasher-repair-cost/' },
  ],
  'freezer-repair': [
    { label: 'Freezer not freezing', href: '/blog/freezer-not-freezing/' },
    compareCosts,
  ],
  'microwave-repair': [
    { label: 'Microwave not heating', href: '/blog/microwave-not-heating-philadelphia/' },
    compareCosts,
  ],
  'ice-maker-repair': [
    { label: 'If the freezer is also warming up', href: '/blog/freezer-not-freezing/' },
    { label: 'If the refrigerator is also warm', href: '/blog/refrigerator-not-cooling/' },
    compareCosts,
  ],
};

const laundryPhoto = {
  name: 'laundry',
  alt: 'Household washing machine and dryer pictured on the 5VA Google Business Profile',
};

type ServiceProof = {
  photo: { name: string; alt: string };
  reviewer?: string;
};

// These are existing business-uploaded photos. The caption does not tie a photo to a review.
export const serviceProof: Partial<Record<string, ServiceProof>> = {
  'refrigerator-repair': {
    photo: {
      name: 'refrigerator',
      alt: 'Stainless steel refrigerator with a 5VA tool bag nearby',
    },
    reviewer: 'Tim Kurb',
  },
  'washer-repair': {
    photo: laundryPhoto,
    reviewer: 'Sabina Haydarova',
  },
  'dryer-repair': {
    photo: laundryPhoto,
  },
  'oven-stove-repair': {
    photo: {
      name: 'range',
      alt: 'Household double-oven range pictured on the 5VA Google Business Profile',
    },
  },
  'dishwasher-repair': {
    photo: {
      name: 'dishwasher',
      alt: 'Household dishwasher pictured on the 5VA Google Business Profile',
    },
    reviewer: 'Ashley Natalini',
  },
};
