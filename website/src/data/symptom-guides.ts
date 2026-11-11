import type { JournalArticle } from './journal.ts';

type Guide = Pick<
  JournalArticle,
  | 'slug'
  | 'title'
  | 'category'
  | 'description'
  | 'publishedOn'
  | 'primaryKeyword'
  | 'relatedServices'
  | 'takeaway'
  | 'sections'
  | 'faqs'
  | 'sources'
>;

export const symptomGuides: Guide[] = [
  {
    slug: 'dishwasher-not-cleaning',
    title: 'Dishwasher Not Cleaning Dishes? Read the Pattern Before Booking Repair',
    category: 'Kitchen care',
    description:
      'A rack-by-rack guide to dirty dishes, white film, and leftover detergent, with safe checks and when to book household dishwasher repair.',
    publishedOn: '2026-11-11',
    primaryKeyword: 'dishwasher not cleaning dishes',
    relatedServices: ['dishwasher-repair'],
    takeaway:
      'Look at what stayed dirty and where it was loaded. Check for blocked spray paths and review the filter, detergent, and cycle instructions for your model. Repeated poor cleaning across both racks calls for a different assessment than one dirty cup.',
    sections: [
      {
        heading: 'Read the load before you empty it',
        paragraphs: [
          'An upper rack of gritty glasses, a single bowl with baked-on food, and a full load that looks untouched are three different complaints. Take a photo of the dishes in place once the machine has finished and cooled. Record the cycle, detergent, and whether it was a typical load. A photo of the rack tells a technician more than a pile of dishes on the counter.',
          'Separate texture from location. Loose grains, a greasy coating, chalky spots, and detergent in the dispenser point to different questions. Ask whether the pattern started suddenly or developed over several weeks. A recent change in detergent or rack height belongs in the history even when it seems unrelated.',
        ],
        table: {
          caption: 'What the wash pattern can tell you',
          headings: ['What you see', 'What to check or record', 'When to discuss repair'],
          rows: [
            [
              'Top rack stays dirty',
              'Rack position, tall items below, and any rack-only setting',
              'The same rack still fails with a clear spray path',
            ],
            [
              'Both racks retain food',
              'Cycle, loading, and the model’s accessible filter instructions',
              'A normal load repeatedly comes out dirty',
            ],
            [
              'White film on glassware',
              'Whether the film wipes off and whether it follows a detergent change',
              'Residue persists after following the model’s use guidance',
            ],
            [
              'Detergent stays in the cup',
              'Whether a pan or cutting board blocks the dispenser door',
              'The dispenser stays closed on ordinary loads with clearance',
            ],
          ],
        },
      },
      {
        heading: 'Check the spray path and cycle selection',
        paragraphs: [
          'With the dishwasher off and cool, look for utensils hanging below a rack, tall pans in the spray path, and bowls nested together. A rack may slide in normally even though the loaded items block an arm. If your manual allows you to check that an accessible arm moves freely, do it gently. Leave mounted parts in place unless the manual identifies them as user-removable.',
          'Check the selected program. Some machines have a top-rack or zone setting intended for a small load. Also note any change in adjustable rack position. Designs vary, so follow your manual for the correct position and how the rack should seat. Persistent top-rack trouble after those checks is a useful observation for a service visit.',
        ],
      },
      {
        heading: 'Distinguish mineral film from leftover food',
        paragraphs: [
          'White spots or a dull surface may involve water conditions, detergent, rinse aid, or permanent glass damage. Start by noting whether the problem affects plastic, glass, and plates equally. If the dishes also have food stuck to them, report both observations. They are more informative together than a general description of cloudy glasses.',
          'Use only detergent intended for automatic dishwashers and follow the amount and rinse-aid guidance in the manual. If the model has a user-cleanable filter, clean and reinstall it according to the manufacturer’s instructions. Leave the filter alone if you see sharp debris or cannot safely access it. Avoid improvised cleaners or mixing chemicals to chase a residue problem.',
        ],
      },
      {
        heading: 'Know when cleaning trouble is part of a different fault',
        paragraphs: [
          'If the tub still holds a large amount of water after the cycle, record the water level and any error message. The wash complaint may be part of a drainage problem. A small amount in the sump can be normal on some models, so describe where the water sits and check the manual before drawing a conclusion.',
          'A cycle that ends early, an error that repeats, or dishes that remain dirty on both racks after ordinary use deserve a closer look. A service assessment can distinguish a loading issue from trouble with filling, circulation, heating, or detergent delivery. The appearance of one load cannot identify which component failed.',
          'Stop using the appliance if it leaks, produces a burning smell, or shows an electrical problem. Leave it in place and get appropriate help. A photo and the last successful cycle are enough to start a service conversation.',
        ],
        links: [
          {
            label: 'When a dishwasher leaves standing water',
            href: '/blog/dishwasher-not-draining/',
          },
        ],
      },
      {
        heading: 'Prepare for a dishwasher repair visit',
        paragraphs: [
          'Share your ZIP code, the accessible model number, and a short description such as “the top rack has grit after a normal cycle, the lower rack is clean, and the dispenser opened.” Mention a recent installation, disposal replacement, or repeated error. Include one photo of the rack pattern if it helps. Leave the machine installed.',
          '5VA assesses household dishwashers at customers’ homes in its listed Philadelphia-area ZIP codes and surrounding service area. Confirm coverage and what the diagnostic visit includes before booking. If an appliance fault is found, review the proposed work and price before authorizing repair.',
        ],
        links: [
          { label: 'Household dishwasher repair', href: '/services/dishwasher-repair/' },
          { label: 'Compare dishwasher repair estimates', href: '/blog/dishwasher-repair-cost/' },
          { label: 'Check home-visit coverage', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why is my dishwasher cleaning only the bottom rack?',
        a: 'Check for items blocking spray movement, the position of the upper rack, and rack-specific cycle settings. If the upper rack consistently fails with ordinary loading, note that pattern for a repair assessment.',
      },
      {
        q: 'Does detergent left in the dispenser mean the dispenser is broken?',
        a: 'It can also happen when an item blocks the door or the cycle does not finish. Record whether the lid opened and whether the display showed an error before assuming a part failed.',
      },
      {
        q: 'Can I book a visit if cleaning the filter did not help?',
        a: 'Yes. Share the model, which racks are affected, the cycle used, and whether there is any standing water. Confirm home-visit coverage for your ZIP code when you call.',
      },
    ],
    sources: [
      {
        title: 'Whirlpool: dishwasher cleaning and rack-specific symptoms',
        url: 'https://www.whirlpool.com/blog/kitchen/dishwasher-not-cleaning.html',
      },
      {
        title: 'GE Appliances: dishwasher loading, filters, and detergent questions',
        url: 'https://www.geappliances.com/ge/service-and-support/faq-dishwasher.htm',
      },
    ],
  },
  {
    slug: 'dryer-wont-start',
    title: 'Dryer Won’t Start? What a Blank Display, Click, or Hum Can Tell You',
    category: 'Laundry care',
    description:
      'Find safe next steps for a dryer that will not start, from a blank control panel to a dryer that clicks, hums, or stops as the cycle begins.',
    publishedOn: '2026-11-11',
    primaryKeyword: 'dryer won’t start',
    relatedServices: ['dryer-repair'],
    takeaway:
      'Note whether the panel lights, whether Start produces a click or hum, and whether the drum moves. With the dryer cool and idle, check the door and model-specific cycle, lock, and Start instructions. Stop attempts if it hums without tumbling or trips power.',
    sections: [
      {
        heading: 'Describe what happens in the first few seconds',
        paragraphs: [
          '“Won’t start” can mean a dead display, a machine that beeps but does nothing, or a drum that moves briefly and stops. These details change the first questions a technician will ask. Use what you observed during the last normal attempt. There is no reason to start a faulty machine again just to make a recording.',
          'Note any code, illuminated lock symbol, or recent outage. If the dryer stopped in the middle of a load, note whether it had been running normally earlier that day. Tell the technician about a recent move, installation, or power problem. A start issue that appeared immediately after installation can require a different assessment from one that developed in a long-running setup.',
        ],
        table: {
          caption: 'Separate no power, no start, and early shutdown',
          headings: ['What happens', 'What to record', 'Next step'],
          rows: [
            [
              'Display and drum light are dark',
              'Whether there was an outage or a breaker tripped',
              'Discuss appliance and supply symptoms before moving anything',
            ],
            [
              'Panel lights but buttons do not respond',
              'Lock icon, selected cycle, and any displayed message',
              'Use the model’s normal control and Start instructions',
            ],
            [
              'A click or hum occurs without tumbling',
              'Whether the drum moved at all and when the sound began',
              'Leave the dryer stopped and arrange diagnosis',
            ],
            [
              'Dryer starts and stops shortly after',
              'Elapsed time, cycle, load, and any message',
              'Describe an early shutdown when requesting service',
            ],
          ],
        },
      },
      {
        heading: 'Check the door, selected cycle, and Start control',
        paragraphs: [
          'When the dryer is cool and idle, look for clothing caught at the door and close it using normal pressure. A door may look shut while the latch has not engaged. If the latch is damaged, loose, or will not close normally, leave it alone. Never hold or tape a door switch in place.',
          'Check the manual for the control lock indicator, the correct drying cycle, and how long the model expects Start to be held. Some settings do not begin a normal drying cycle and some panels respond differently after a power interruption. If the controls still fail to respond after following the normal instructions, record what you tried and stop there.',
        ],
      },
      {
        heading: 'Keep electrical and internal checks out of the laundry room troubleshooting',
        paragraphs: [
          'A lit display shows that some controls are receiving power. It cannot confirm that every electrical connection is sound or that a motor or switch has failed. A dark display also has several possible explanations. Keep the cord, outlet, cabinet panels, and internal wiring undisturbed and tell the repair provider what you observed.',
          'If the dryer trips a breaker repeatedly, the plug or outlet shows damage, or you notice smoke or a burning smell, leave the appliance off and seek appropriate help. Supply or outlet problems may need an electrician. A suspected gas leak requires immediate safety action and help from the gas utility or emergency services from a safe location.',
        ],
      },
      {
        heading: 'Treat a dryer that runs cold as a separate symptom',
        paragraphs: [
          'If the drum continues to turn normally and the clothes stay cold or damp, say so. That is a running dryer with a heat or drying performance complaint. If it stops partway through, note whether it was a timed cycle or a sensor cycle and whether there was an error or unusual sound.',
          'Descriptions such as “hums and never moves,” “display went black,” and “drum kept turning with no heat” are better starting points than a suspected part name. They help the service provider prepare for an on-site inspection and avoid a premature parts purchase.',
        ],
        links: [
          {
            label: 'What to check when a dryer runs but does not heat',
            href: '/blog/dryer-not-heating-philadelphia/',
          },
        ],
      },
      {
        heading: 'Arrange a residential dryer repair assessment',
        paragraphs: [
          'Gather the accessible model label, ZIP code, dryer type if known, and a short timeline. Say if the unit is stacked, in a closet, or difficult to access. For example, “the display lights, the dryer clicks when I press Start, and the drum never moves” is enough to start a useful conversation.',
          '5VA visits homes in covered Philadelphia-area communities. Confirm your ZIP and appliance type, ask what a diagnostic visit includes, and review the proposed repair after inspection. Where the unit is older or has multiple issues, compare the diagnosed repair with the full cost of a replacement, including installation and removal.',
        ],
        links: [
          { label: 'Household dryer repair', href: '/services/dryer-repair/' },
          { label: 'How to compare dryer repair costs', href: '/blog/dryer-repair-cost/' },
          { label: 'Check home-visit coverage', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why won’t my dryer start when it has power?',
        a: 'The display may light even if the door is not latched, a control lock is active, or a component needs diagnosis. Follow the normal door and control checks for your model and record any code.',
      },
      {
        q: 'Should I keep pressing Start if the dryer hums?',
        a: 'No. Leave the appliance stopped, note the sound and whether the drum moved, and arrange an assessment. Do not try to start it by turning the drum or bypassing a safety device.',
      },
      {
        q: 'What information helps when scheduling dryer repair?',
        a: 'Provide the model if accessible, your ZIP code, whether the controls light, and what happens when Start is pressed. Mention a stacked installation or earlier power issue.',
      },
    ],
    sources: [
      {
        title: 'Whirlpool Product Help: dryer starting and control checks',
        url: 'https://producthelp.whirlpool.com/Laundry/Dryers/Dryer/Operation/Not_Starting/Not_Starting_or_Not_Operating_-_Dryer',
      },
      {
        title: 'Whirlpool: common reasons a dryer will not start',
        url: 'https://www.whirlpool.com/blog/washers-and-dryers/why-wont-my-dryer-start.html',
      },
    ],
  },
];
