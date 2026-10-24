const guide = (
  slug: string,
  title: string,
  category: string,
  description: string,
  primaryKeyword: string,
  relatedServices: string[],
  takeaway: string,
  sections: [string, string][],
  faqs: [string, string][],
  sources: [string, string][],
) => ({
  slug,
  title,
  category,
  description,
  primaryKeyword,
  relatedServices,
  takeaway,
  sections: sections.map(([heading, paragraph]) => ({ heading, paragraphs: [paragraph] })),
  faqs: faqs.map(([q, a]) => ({ q, a })),
  sources: sources.map(([title, url]) => ({ title, url })),
});

export const localGuides = [
  guide(
    'appliance-repair-philadelphia',
    'Appliance Repair in Philadelphia: What to Know Before Booking',
    'Repair planning',
    'Find the right residential appliance service in Philadelphia, prepare useful details, and clarify the visit before you book.',
    'residential appliance repair Philadelphia',
    ['refrigerator-repair', 'washer-repair', 'dishwasher-repair'],
    'Start with the appliance, symptom, model, and ZIP code. Confirm residential service and discuss any visit fee before booking.',
    [
      [
        'Match the service to the appliance',
        'A refrigerator that is warm, a washer full of water, and an oven that will not heat need different assessments. Name the appliance and the problem rather than requesting a generic house repair. 5VA works on household kitchen and laundry appliances. We do not offer general home maintenance, appliance sales, retail parts sales, or commercial equipment repair. That distinction helps you reach the right service from the first conversation.',
      ],
      [
        'Give a useful symptom history',
        'Tell us what the appliance does, what it no longer does, and when that changed. Record an error message exactly as displayed. Mention a recent installation, move, power interruption, or earlier repair without assuming it caused the fault. A clear history helps prepare a visit, but cannot establish which part failed. Keep the appliance installed and avoid removing covers to gather more information.',
      ],
      [
        'Plan around your Philadelphia property',
        'For a rowhouse, apartment, or rental, practical access matters. Share your ZIP code, floor, stairs, entry arrangements, and parking restrictions. Mention stacked laundry or a built-in refrigerator before the appointment. Tenants should confirm the property owner’s authorization and who will approve the work. You do not need to move a heavy appliance or expose connections before contacting us.',
      ],
      [
        'Clarify the visit and proposed work',
        'Ask what any diagnostic fee covers and how the repair estimate will be discussed. A free initial conversation does not mean a free on-site diagnosis, parts, or labor. A model-specific part may need to be ordered, and an assessment may show that repair is unsuitable. Discuss the proposed work and expected cost before authorizing it. Avoid buying a component based only on an online symptom list.',
      ],
      [
        'Confirm the address before booking',
        'Philadelphia is 5VA’s primary focus. We also welcome Pennsylvania and New Jersey inquiries and confirm travel by exact ZIP code and job. A service-area page does not guarantee an appointment in every town. Call or text +1 (267) 704-8588 with the appliance, model, symptoms, and location. Use manufacturer guidance for safe observations, and stop using equipment that leaks, sparks, or smells unusual.',
      ],
    ],
    [
      [
        'Can I text instead of calling?',
        'Yes. Use +1 (267) 704-8588 for a plain SMS with your appliance, symptoms, and ZIP code.',
      ],
      [
        'Do you sell appliances or spare parts?',
        'No. 5VA provides household appliance repair only, with no appliance or retail parts sales.',
      ],
      [
        'Is the first call free?',
        '5VA does not charge for the initial conversation. Visit, diagnostic, parts, and repair fees are separate.',
      ],
    ],
    [
      [
        'GE Appliances: product support and manuals',
        'https://www.geappliances.com/ge/service-and-support/',
      ],
    ],
  ),

  guide(
    'dryer-not-heating-philadelphia',
    'Dryer Not Heating? What to Note Before a Repair Visit',
    'Laundry care',
    'Record the cycle, heat behavior, and model before arranging residential dryer repair in Philadelphia.',
    'dryer not heating Philadelphia',
    ['dryer-repair', 'washer-repair'],
    'Stop repeated test cycles. Note whether the drum turns, the selected cycle, and whether the dryer is gas or electric. Leave internal checks to a technician.',
    [
      [
        'Separate no heat from slow drying',
        'Describe the result carefully: completely cold air, some warmth, or clothes that stay damp after an ordinary load. Note whether the drum turns and whether the machine stops early or displays an error. A drying complaint alone does not identify a heater failure. Laundry that entered unusually wet can also change the result, so mention whether the washer completed its normal spin.',
      ],
      [
        'Read the selected cycle',
        'Compare the setting with the exact owner’s manual. Some cycles use little or no heat, and controls differ by model. Take a photo before changing settings so the original situation is clear. Avoid repeatedly running a dryer that is overheating, smelling of burning, or behaving unpredictably. An online checklist is not a reason to keep testing an appliance that appears unsafe.',
      ],
      [
        'Keep lint care accessible',
        'With the dryer off and cool, maintain the accessible lint screen according to its manual. NFPA recommends keeping the screen clean and having venting properly maintained. Do not reach into moving components, dismantle ducts, or pull stacked appliances away from the wall. If airflow or installation needs a separate service, discuss that after assessment rather than assuming an internal part will solve it.',
      ],
      [
        'Share the installation details',
        'Have the brand, model, and gas or electric type ready. Mention stacked installation, a laundry closet, or a recent move. Photograph the accessible model label and controls without removing panels or disturbing connections. For Philadelphia apartments, add the floor and entry instructions. These details help plan access; you do not need to prepare the machine for disassembly.',
      ],
      [
        'Arrange the right assessment',
        'Contact 5VA with your ZIP code and a brief account of the failed cycle. We handle household dryers, not laundromat or commercial laundry equipment. Philadelphia is our focus; Pennsylvania and New Jersey travel is confirmed before booking. Ask about any diagnostic fee and review the proposed repair after assessment. If your washer also leaves laundry very wet, describe that separately.',
      ],
    ],
    [
      [
        'Does a turning drum mean the dryer is working?',
        'No. Drum movement does not confirm that heating, airflow, and controls work correctly.',
      ],
      [
        'Do you assess gas and electric dryers?',
        'Share the fuel type and model so the particular household dryer can be confirmed before booking.',
      ],
      [
        'Can you service laundromat machines?',
        'No. Commercial laundry equipment is outside our residential service.',
      ],
    ],
    [
      [
        'NFPA: clothes dryer safety',
        'https://www.nfpa.org/-/media/project/storefront/catalog/files/safety-tip-sheets/dryersafetytips.pdf',
      ],
    ],
  ),

  guide(
    'dishwasher-not-draining',
    'Dishwasher Not Draining? A Clear Next Step',
    'Kitchen care',
    'Understand standing water, record the problem safely, and prepare for a household dishwasher assessment.',
    'dishwasher not draining repair',
    ['dishwasher-repair'],
    'A little water in a model’s sump can be normal. A new high water level, incomplete cycle, or leak deserves attention; avoid repeated cycles and drain chemicals.',
    [
      [
        'Describe where water remains',
        'Look without reaching into the water. Is it a small amount in the recessed sump, or does it cover the flat bottom of the tub? Did the machine finish, stop with an error, or never start its final drain? Some dishwashers retain a little sump water by design. Compare the level with your model’s manual rather than treating every drop as proof of a failed pump.',
      ],
      [
        'Notice recent changes',
        'Tell the technician if the problem followed an installation, sink or disposal work, or a change in detergent. Mention whether the kitchen sink drains normally. This history helps distinguish appliance behavior from a surrounding drain issue. Do not disconnect a hose, remove the machine from its cabinet, or test plumbing connections to gather evidence. A short description and clear photo are a useful starting point.',
      ],
      [
        'Follow the exact owner’s manual',
        'A user-removable filter may need routine care, but designs vary. Follow your exact manual and avoid reaching into retained water where debris or broken glass could be hidden. Whirlpool advises against drain-opening chemicals inside the dishwasher. If it leaks or the instructions are unclear, stop using it and arrange help rather than trying cleaners or repeated drain cycles.',
      ],
      [
        'Prepare for the visit',
        'Note the brand, model, error message, and when the cycle stops. Take an overview of the installation and a photo of the water level when safe. Leave the dishwasher in place; clear loose items from the work area instead. For rentals, confirm permission to authorize an assessment. Mention wet flooring or cabinet damage before the appointment so access can be discussed.',
      ],
      [
        'Assess the cause before buying parts',
        'Standing water can have more than one cause. Buying a pump based on a symptom alone can leave the original issue unresolved. 5VA assesses residential dishwashers and discusses suitable work and expected cost before approval. We do not sell retail parts or repair restaurant dishwashers. Call or text your Philadelphia, PA, or NJ ZIP code to confirm the appliance, travel, and appointment options.',
      ],
    ],
    [
      [
        'Is any water normal?',
        'Some models retain a little sump water. Describe a new higher level or a cycle that will not finish when requesting service.',
      ],
      [
        'Should I pull it out?',
        'No. Leave the installation and connections in place and clear access around it.',
      ],
      [
        'Can I use drain cleaner?',
        'Do not use drain-opening chemicals in the dishwasher. Follow the exact manual for permitted maintenance.',
      ],
    ],
    [
      [
        'Whirlpool: dishwasher not draining',
        'https://producthelp.whirlpool.com/Dishwashers/Product_Info/Dishwasher_Product_Assistance/Dishwasher_Not_Draining',
      ],
    ],
  ),

  guide(
    'oven-not-heating',
    'Oven Not Heating? Prepare for an Assessment',
    'Kitchen care',
    'Record the affected cooking functions, model, and fuel type before arranging household oven or range repair.',
    'oven not heating repair Philadelphia',
    ['oven-stove-repair', 'microwave-repair'],
    'Record the affected mode and error code without repeated testing. Do not open panels, handle electrical components, or investigate gas connections.',
    [
      [
        'Separate the oven from the cooktop',
        'A range has several functions that can behave differently. Tell us whether the oven, one burner, the whole cooktop, or the display is affected. For a wall oven, note whether there is one cavity or two and which has the problem. A specific description is more useful than a guessed part name and helps avoid treating different faults as the same issue.',
      ],
      [
        'Record the setting and message',
        'Check visible controls against the owner’s manual and photograph error messages before clearing them. Mention a delayed-start setting or lock message if present. Do not run self-clean as preparation for repair. Let the appliance cool and stop repeated heating tests if there are unusual smells, smoke, sparks, or unpredictable operation. Follow emergency guidance for a suspected gas leak.',
      ],
      [
        'Keep technical checks professional',
        'A no-heat symptom can involve different controls or components depending on the model. Manufacturer troubleshooting explains permitted basic checks, but is not permission to open panels or test live circuits. Do not bypass switches, attempt ignition work, or modify connections. Describe what you observed during ordinary use and leave further fault testing to an appropriate technician.',
      ],
      [
        'Explain the installation',
        'Share the brand, model, fuel type, and whether it is a freestanding range, slide-in range, wall oven, or separate cooktop. An overview helps discuss access. Leave heavy and built-in appliances in place. For a Philadelphia apartment, add entry and parking details; if a property owner must approve repairs, arrange that authorization before the appointment.',
      ],
      [
        'Compare the proposed next step',
        'Call or text 5VA with the symptom history and ZIP code. We confirm the household appliance and travel before booking, with Philadelphia as the main focus and PA/NJ requests considered by location. Ask about visit or diagnostic charges and the proposed repair cost. We repair residential appliances only, with no range sales, retail parts sales, or commercial cooking equipment service.',
      ],
    ],
    [
      [
        'Can you assess a separate cooktop?',
        'Send the model, fuel type, and installation details so the residential cooktop can be confirmed.',
      ],
      [
        'Should I run self-clean first?',
        'No. Let the appliance cool and ask about specific preparation when scheduling.',
      ],
      ['Do you repair restaurant ovens?', 'No. Commercial cooking equipment is excluded.'],
    ],
    [
      [
        'Whirlpool: why an oven may not heat',
        'https://www.whirlpool.com/blog/kitchen/why-is-my-oven-not-heating-up.html',
      ],
    ],
  ),

  guide(
    'refrigerator-leaking-water',
    'Refrigerator Leaking Water? What to Tell the Technician',
    'Kitchen care',
    'Locate visible water safely, protect the surrounding area, and collect useful details before arranging refrigerator repair.',
    'refrigerator leaking water repair',
    ['refrigerator-repair', 'ice-maker-repair'],
    'Note where water first appears and whether cooling has changed. Stop using a leaking dispenser or ice function; do not move the refrigerator or disconnect water lines.',
    [
      [
        'Describe the visible pattern',
        'Water in a drawer, beneath the front edge, or around a dispenser may point to different areas for assessment. Note where it first appears and whether it follows ice making, dispensing, or time with the doors closed. Photograph the visible location when safe. Avoid moving a heavy refrigerator or reaching behind it, especially where water could be near electrical equipment.',
      ],
      [
        'Think about recent changes',
        'Mention a recent filter change, installation, move, or water supply job. Keep the filter packaging or relevant paperwork if available. A timing connection is useful history, not proof that a particular item caused the leak. Avoid tightening random fittings or buying another part simply because the symptoms followed other work. The installation needs a model-specific assessment.',
      ],
      [
        'Check cooling separately',
        'Tell us whether the fresh-food and freezer compartments still cool normally. Water and temperature changes may occur together, but they are different symptoms. If cooling is uncertain, use an appliance thermometer and official food-safety guidance for stored food. Repairing a leak does not establish that food exposed to uncertain temperatures is safe to keep.',
      ],
      [
        'Gather details safely',
        'Send the accessible model label, an overview, and the visible leak if you can photograph them without moving equipment. Do not remove covers, chip ice, or heat frozen components. Stop using a leaking dispenser or ice function. If water spreads near electricity or the situation is unsafe, keep clear and arrange appropriate help rather than continuing troubleshooting.',
      ],
      [
        'Confirm the visit and scope',
        'For a Philadelphia home or PA/NJ service inquiry, contact 5VA with your ZIP code and symptom history. Explain built-in cabinetry, narrow access, or affected flooring. We discuss the visit, assessment, and proposed work before repair approval. 5VA repairs household appliances only; we do not sell refrigerators, retail filters or spare parts, or service commercial refrigeration.',
      ],
    ],
    [
      [
        'Should I move the fridge to find the leak?',
        'No. Leave the appliance and water connections in place and describe what you can safely see.',
      ],
      [
        'Is a leak always an ice maker problem?',
        'No. The location, timing, model, and cooling behavior need assessment before identifying a cause.',
      ],
      ['Can I buy a filter from 5VA?', 'No. We do not provide retail parts or filter sales.'],
    ],
    [
      [
        'GE Appliances: refrigerator and freezer support',
        'https://www.geappliances.com/ge/service-and-support/refrigerators-freezers.htm',
      ],
      [
        'FoodSafety.gov: food safety in an emergency',
        'https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency',
      ],
    ],
  ),

  guide(
    'freezer-not-freezing',
    'Freezer Not Freezing? Protect Food and Plan the Repair',
    'Kitchen care',
    'Record a household freezer cooling problem safely and prepare useful information for a repair visit.',
    'freezer not freezing repair',
    ['freezer-repair', 'refrigerator-repair'],
    'Protect food first, limit door openings, and record the temperature history. Do not use sharp tools or heat to remove ice while investigating.',
    [
      [
        'Put the food decision first',
        'A lit display or running motor does not prove food is safely frozen. Note when you first noticed softening and use a suitable thermometer if available. Limit door openings and consult FoodSafety.gov about thawed food. Do not taste food to check safety. A technician can assess the appliance, but cannot reconstruct an unknown temperature history for everything inside.',
      ],
      [
        'Describe the cooling situation',
        'Is this a standalone chest freezer, an upright freezer, or a refrigerator’s freezer section? Are all areas warm, or is the concern limited to one drawer? For a combined appliance, say whether the refrigerator compartment changed too. Note recent loading, a power interruption, or a door left open without assuming a single event explains the continuing problem.',
      ],
      [
        'Look at doors and controls',
        'Compare the temperature setting with the model’s manual. Check whether packaging prevents full door closure and note visible frost around a seal. These observations do not require dismantling anything. Avoid chipping ice, applying heat, or removing covers. Designs and recovery times vary, so advice for another model is not a reliable reason to change settings repeatedly.',
      ],
      [
        'Prepare model and access details',
        'Photograph the accessible model label, display, and frost pattern when safe. Mention cabinetry, a basement location, stairs, or tight access. Keep the freezer in place and discuss preparation when scheduling. For a rental, clarify who can authorize the assessment. A short history is more useful than a list of components found online.',
      ],
      [
        'Arrange household freezer service',
        '5VA handles residential appliance repair, with Philadelphia as its main focus and PA/NJ travel confirmed by ZIP code. Call or text the type, model, symptoms, and address area. Discuss any diagnostic fee and proposed work after assessment. We do not sell freezers or retail parts, and commercial walk-in or restaurant refrigeration is excluded. Keep following food-safety guidance while awaiting a visit.',
      ],
    ],
    [
      [
        'Can a running freezer still be warm?',
        'Yes. Sound or a light does not confirm safe storage temperature. Use a suitable thermometer and food-safety guidance.',
      ],
      [
        'Can you assess a chest freezer?',
        'Share the household freezer model and location so the specific job can be confirmed.',
      ],
      ['Do you service walk-in freezers?', 'No. Commercial refrigeration is excluded.'],
    ],
    [
      [
        'GE Appliances: freezer troubleshooting',
        'https://repair.geappliances.com/resources/faq/article/freezer-troubleshooting-guide',
      ],
      [
        'FoodSafety.gov: emergency food guidance',
        'https://www.foodsafety.gov/keep-food-safe/food-safety-in-disaster-or-emergency',
      ],
    ],
  ),

  guide(
    'appliance-repair-visit-checklist',
    'Your Appliance Repair Visit Checklist',
    'Repair planning',
    'Prepare the model, symptoms, access, and approval details that make a household appliance repair visit easier to arrange.',
    'appliance repair visit checklist',
    [
      'washer-repair',
      'dryer-repair',
      'oven-stove-repair',
      'freezer-repair',
      'microwave-repair',
      'ice-maker-repair',
    ],
    'Send the appliance type, model, symptom, and ZIP code. Leave it installed; clarify access, authorization, and any visit fee before the appointment.',
    [
      [
        'Make a concise appliance summary',
        'Start with the appliance and exact problem: a washer stops before draining, an oven display works without heat, or a freezer is warming. Note when it began and any error code. Keep separate symptoms separate. You do not need a diagnosis before contacting us, and a guessed part name can distract from the useful observations you already have.',
      ],
      [
        'Find the model safely',
        'Use an accessible label or purchase paperwork to identify the brand and model. If the label is hard to reach, say so rather than moving a heavy appliance or opening covers. An overview photo is useful too. For a microwave or built-in cooking appliance, installation details help discuss suitability and access before a visit.',
      ],
      [
        'Plan access to the appliance',
        'Clear loose items from the route and work area when safe. Mention stairs, elevators, parking, stacked laundry, or cabinetry. Leave the appliance installed as found unless specific safe instructions are given by an appropriate professional. Do not dismantle it to speed up the appointment. Describe retained water, an active leak, or an unusual smell before scheduling.',
      ],
      [
        'Clarify approval and charges',
        'For a rental, ask who can approve the assessment and repair. Discuss any diagnostic fee and how proposed work will be priced. The initial conversation has no 5VA service charge; on-site work, parts, and repairs are separate. A visit may identify a part order or show that repair is unsuitable. Ask what happens next before committing.',
      ],
      [
        'Call or text the same number',
        'Use +1 (267) 704-8588 with your ZIP code, model, and summary. Philadelphia is our primary area; Pennsylvania and New Jersey appointments are confirmed by location and job. 5VA repairs household appliances only, with no appliance sales, retail parts sales, or commercial repair. Send photos from your messaging app. No website form or account is needed.',
      ],
    ],
    [
      [
        'Do I need to move the appliance?',
        'No. Leave it in place and describe access when scheduling.',
      ],
      [
        'What if I cannot find the model?',
        'Tell us the brand if known and send an overview. Do not dismantle or move the appliance to locate a label.',
      ],
      [
        'Should I buy parts first?',
        'Discuss assessment before buying parts. A symptom alone does not identify the correct repair.',
      ],
    ],
    [
      [
        'GE Appliances: manuals and product support',
        'https://www.geappliances.com/ge/service-and-support/',
      ],
    ],
  ),
];
