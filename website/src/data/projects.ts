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
      'Model and whether it is upright, chest or part of a refrigerator',
      'Temperature reading, visible frost and when food began softening',
      'Any power interruption, door problem or recent change before the fault',
    ],
    photo:
      'The accessible model label and visible frost or door gap. Leave covers and the appliance in place.',
    note: 'Protect stored food separately while arranging an appliance assessment.',
  },
  'microwave-repair': {
    items: [
      'Model and whether it is countertop, built in or over the range',
      'Whether it starts, runs without heat or stops during use',
      'Any error code, door damage, sparking or recent change',
    ],
    photo:
      'The accessible label, controls and entire installation. Do not unmount the microwave or remove covers.',
    note: 'Confirm model and repair suitability before booking a microwave visit.',
  },
  'ice-maker-repair': {
    items: [
      'Model and whether the ice maker is inside a refrigerator or a household unit',
      'Whether ice is not being made, will not dispense or is leaking',
      'Whether cooling is normal and whether a filter or water-supply change came first',
    ],
    photo:
      'The model label, display and visible ice or water problem. Leave the mechanism and water connections in place.',
    note: 'Residential ice makers only; no commercial ice-machine service.',
  },
};
