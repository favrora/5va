export const preparation: Record<string, { items: string[]; photo: string; note: string }> = {
  'refrigerator-repair': {
    items: [
      'Brand, model and approximate appliance age',
      'What has changed, error codes and when it started',
      'Whether the refrigerator, freezer or both are affected',
    ],
    photo: 'The model label, display and any visible water or ice buildup.',
    note: 'Symptoms help prepare the visit. Diagnosis, parts and repair feasibility are confirmed after assessment.',
  },
  'washer-repair': {
    items: [
      'Brand, model and any error code',
      'Which part of the cycle stops or behaves differently',
      'Whether water remains in the drum or leaks outside',
    ],
    photo: 'The model label, display and the visible problem.',
    note: 'Do not repeatedly restart a leaking machine. Share what you observed rather than taking the appliance apart.',
  },
  'dryer-repair': {
    items: [
      'Brand, model and gas or electric type',
      'Whether it starts, turns and produces heat',
      'Any unusual noise, smell or displayed error',
    ],
    photo: 'The model label, controls and accessible vent connection.',
    note: 'Tell us about unusual smells before arranging work. Parts, access and the fault determine the repair plan.',
  },
  'oven-stove-repair': {
    items: [
      'Brand, model and gas or electric type',
      'Which burner, mode or control is affected',
      'Error messages and when the issue started',
    ],
    photo: 'The model label, display and affected controls.',
    note: 'Describe the problem without opening the appliance or testing gas connections yourself.',
  },
  'dishwasher-repair': {
    items: [
      'Brand, model and error messages',
      'Whether the issue is filling, washing, draining or leaking',
      'When it happens during the cycle',
    ],
    photo: 'The model label, display and visible water or residue.',
    note: 'Tell us about active leaks or standing water. Access, diagnosis and parts determine the next step.',
  },
  'freezer-repair': {
    items: [
      'Brand, model, and installation type',
      'Symptoms, error messages, and when they began',
      'Your ZIP code and any access restrictions',
    ],
    photo:
      'The accessible model label, controls, and an overview of the installation. Leave the appliance in place.',
    note: 'Household appliances only. Confirm the model and address before booking; proposed work follows assessment.',
  },
  'microwave-repair': {
    items: [
      'Brand, model, and installation type',
      'Symptoms, error messages, and when they began',
      'Your ZIP code and any access restrictions',
    ],
    photo:
      'The accessible model label, controls, and an overview of the installation. Leave the appliance in place.',
    note: 'Household appliances only. Confirm the model and address before booking; proposed work follows assessment.',
  },
  'ice-maker-repair': {
    items: [
      'Brand, model, and installation type',
      'Symptoms, error messages, and when they began',
      'Your ZIP code and any access restrictions',
    ],
    photo:
      'The accessible model label, controls, and an overview of the installation. Leave the appliance in place.',
    note: 'Household appliances only. Confirm the model and address before booking; proposed work follows assessment.',
  },
};
