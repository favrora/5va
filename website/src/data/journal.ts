import { articles as existingArticles, services } from './content.ts';
import { localGuides } from './local-guides.ts';
export interface JournalSection {
  heading: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
  table?: { caption: string; headings: string[]; rows: string[][] };
}
export interface JournalArticle {
  slug: string;
  title: string;
  seoTitle: string;
  category: string;
  description: string;
  sections: JournalSection[];
  publishedOn?: string;
  sources: { title: string; url: string }[];
  primaryKeyword: string;
  relatedServices: string[];
  faqs: { q: string; a: string }[];
  takeaway: string;
  wordCount: number;
  readTime: string;
  icon: string;
  group: 'kitchen' | 'laundry' | 'planning';
  image: string;
  imageAlt: string;
}
const metadata: Record<
  string,
  { primaryKeyword: string; relatedServices: string[]; takeaway: string }
> = {
  'refrigerator-not-cooling': {
    primaryKeyword: 'refrigerator not cooling what to check',
    relatedServices: ['refrigerator-repair', 'freezer-repair'],
    takeaway:
      'Protect food first. Record cooling behavior and check only visible controls, door closure, and air vents before arranging an assessment.',
  },
  'washer-not-draining': {
    primaryKeyword: 'washer not draining what to do',
    relatedServices: ['washer-repair'],
    takeaway:
      'Distinguish wet clothes from standing water, note the cycle and error code, and avoid opening components or repeating cycles on a leaking machine.',
  },
  'appliance-repair-or-replace': {
    primaryKeyword: 'repair or replace appliance',
    relatedServices: ['refrigerator-repair', 'washer-repair', 'oven-stove-repair'],
    takeaway:
      'Compare an assessed repair with the full replacement cost, including delivery, installation, fit, and removal. 5VA repairs appliances; we do not sell replacements or retail parts.',
  },
};
const titles: Record<string, string> = {
  'washer-not-spinning-philadelphia': 'Washer Not Spinning? Philadelphia Repair Guide | 5VA',
  'microwave-not-heating-philadelphia': 'Microwave Not Heating? Philadelphia Repair Guide | 5VA',
  'washer-leaking-water-philadelphia': 'Washer Leaking Water? Philadelphia Repair Guide | 5VA',
  'refrigerator-making-noise-philadelphia':
    'Refrigerator Making Noise? Philadelphia Repair Guide | 5VA',
  'appliance-repair-philadelphia': 'Appliance Repair in Philadelphia: Booking Guide | 5VA',
  'dryer-not-heating-philadelphia': 'Dryer Not Heating? Philadelphia Repair Guide | 5VA',
  'dishwasher-not-draining': 'Dishwasher Not Draining? What to Record | 5VA',
  'oven-not-heating': 'Oven Not Heating? Prepare for Repair | 5VA',
  'refrigerator-leaking-water': 'Refrigerator Leaking Water? Next Steps | 5VA',
  'freezer-not-freezing': 'Freezer Not Freezing? Food & Repair Guide | 5VA',
  'appliance-repair-visit-checklist': 'Appliance Repair Visit Checklist | 5VA',
  'refrigerator-not-cooling': 'Refrigerator Not Cooling? What to Check First | 5VA',
  'washer-not-draining': 'Washer Not Draining? A Practical Checklist | 5VA',
  'appliance-repair-or-replace': 'Repair or Replace an Appliance? Decision Guide | 5VA',
};
const imageDescriptions: Record<string, string> = {
  'washer-not-spinning-philadelphia':
    'Closed household front-loading washer with laundry visible through the door and a basket nearby',
  'microwave-not-heating-philadelphia':
    'Closed residential countertop microwave beside a ceramic bowl in a warm ivory kitchen',
  'washer-leaking-water-philadelphia':
    'Small water puddle beside a closed household washing machine in a laundry room',
  'refrigerator-making-noise-philadelphia':
    'Closed stainless steel refrigerator with a notebook and phone on the kitchen counter',
  'appliance-repair-philadelphia':
    'Residential refrigerator and range in a sunlit Philadelphia-style kitchen',
  'dryer-not-heating-philadelphia':
    'Open household dryer with towels and a removable lint screen nearby',
  'dishwasher-not-draining':
    'Open residential dishwasher with dishes and water visible in the bottom',
  'oven-not-heating': 'Household electric range and oven in a warm ivory kitchen',
  'refrigerator-leaking-water': 'Water at the base of a household refrigerator with a towel nearby',
  'freezer-not-freezing': 'Open upright household freezer with food and frost around drawers',
  'appliance-repair-visit-checklist':
    'Phone, notebook, and appliance information prepared on a kitchen counter',
  'refrigerator-not-cooling': 'Open refrigerator with food and an appliance thermometer',
  'washer-not-draining': 'Front-loading washer with damp clothes behind the closed door',
  'appliance-repair-or-replace': 'Tools and a notebook for planning an appliance assessment',
};
type JournalInput = Omit<
  JournalArticle,
  'seoTitle' | 'wordCount' | 'readTime' | 'icon' | 'group' | 'image' | 'imageAlt'
>;
const newGuides: JournalInput[] = [
  {
    slug: 'microwave-not-heating-philadelphia',
    title: 'Microwave Not Heating? A Philadelphia Repair Guide',
    category: 'Kitchen care',
    description:
      'Microwave runs but food stays cold? Compare safe observations, countertop and built-in repair decisions, and at-home service in 5VA’s confirmed PA and NJ areas.',
    primaryKeyword: 'microwave not heating Philadelphia',
    relatedServices: ['microwave-repair', 'oven-stove-repair'],
    publishedOn: '2026-10-26',
    takeaway:
      'A working light, fan or turntable does not establish that a microwave is heating. Check only normal user controls and your model’s instructions. Keep the housing closed, stop using a damaged appliance, and discuss the model and installation before booking a repair.',
    sections: [
      {
        heading: 'First, describe what still works',
        paragraphs: [
          '“My microwave is broken” can describe several different appointments. A completely dark display, a cycle that never starts, and a normal-looking cycle that leaves food cold are separate complaints. Start with the behavior you already observed during ordinary use. Does the display respond? Did a cooking countdown run? Did the light, fan or turntable operate? Was the food completely cold or simply less warm than expected? You do not need to recreate the failure to answer these questions.',
          'A short, specific description helps the first conversation stay focused: “The microwave starts and counts down, but yesterday’s food stayed cold; it is an over-the-range model.” Include when the change began and whether it is consistent or intermittent. Do not translate that observation into a diagnosis such as “it needs a magnetron.” Different problems can produce a similar no-heat complaint, and ordering a part from a symptom list can leave the original problem unresolved.',
        ],
        table: {
          caption: 'Microwave symptoms to describe when requesting repair',
          headings: [
            'What you noticed',
            'Useful detail to share',
            'What the observation does not prove',
          ],
          rows: [
            [
              'Light and countdown work; food stays cold',
              'Selected cooking function, power setting and when this began',
              'Which internal component needs replacement',
            ],
            [
              'Display works; cooking will not begin',
              'Exact message, normal door behavior and control response',
              'That the heating system itself has failed',
            ],
            [
              'Food warms less than expected',
              'Usual food, setting and whether the change is new',
              'A safe diagnosis from cooking time alone',
            ],
            [
              'Visible door damage, smoke or sparks',
              'Describe it from a safe position and stop use',
              'That another test cycle is appropriate',
            ],
          ],
        },
      },
      {
        heading: 'Check the function, not the inside of the appliance',
        paragraphs: [
          'GE Appliances notes that a kitchen timer can be mistaken for a cooking cycle. A timer can count down without instructing the microwave to heat. Look at the function you selected and compare it with the owner’s manual for your exact model. Panasonic also identifies power settings and model-specific demonstration modes as possible explanations for a no-heat report. These are user-control checks, not reasons to remove a cover or try a button sequence found for a different appliance.',
          'If the display shows a message, photograph it before clearing anything. Record the exact characters rather than guessing at their meaning. A model number matters because similarly named controls and error codes do not necessarily mean the same thing across products. Avoid repeatedly unplugging the appliance, cycling a breaker or experimenting with hidden service menus to chase a fault. If a breaker trips again, or a cord or outlet appears damaged, stop and arrange suitable professional help.',
          'You can consult normal operating instructions without running another heating test. Do not run the microwave empty, heat liquids for an improvised test, or keep extending cooking time when its behavior has changed. Explain what happened during your last ordinary use instead. If the basic control information does not explain the problem, an assessment is the next useful step.',
        ],
      },
      {
        heading: 'Know when to stop using the microwave',
        paragraphs: [
          'The FDA advises against using a microwave with a door that will not close properly or has damaged hinges, latches or sealing surfaces. Stop using it if it appears to continue operating with the door open. Do not hold the door in a particular position, tape it shut, defeat a latch or try to adjust a safety interlock. Photograph accessible exterior damage only if that can be done safely, and explain the concern before arranging a visit.',
          'Smoke, persistent sparking, a burning smell or visibly damaged electrical equipment also calls for stopping use. If there is an active fire or immediate danger, seek emergency assistance rather than waiting for an appliance appointment. Do not reach into equipment, move a hot appliance or open its housing. Once an immediate hazard has been handled, a repair request can focus on whether the appliance is suitable for assessment.',
        ],
      },
      {
        heading: 'Why the cover should stay on even after unplugging',
        paragraphs: [
          'GE specifically warns that a microwave’s internal high-voltage capacitor can retain a dangerous charge after the appliance is unplugged. Disconnecting it is not a safe invitation to inspect internal wiring, test a fuse or replace a component. This guide therefore gives no internal testing, capacitor-discharge or component-replacement instructions. Keep any accessible model information and exterior photographs; leave the cabinet intact.',
          'That distinction also applies to online repair videos. A video may show a familiar-looking microwave while omitting the product’s construction, required equipment and safety checks. It cannot establish that the same fault exists in your home. Buying an internal part first can make a service conversation harder, especially if the model or actual diagnosis differs. 5VA provides repair service and does not sell spare parts over the counter.',
        ],
      },
      {
        heading: 'Countertop, over-the-range and built-in units need different planning',
        paragraphs: [
          'Tell us how the microwave is installed before discussing an appointment. A countertop appliance, an over-the-range unit and a built-in model can have very different access requirements. An over-the-range microwave may also provide a light and exhaust fan; explain whether those functions changed too. For a built-in unit, mention the trim surround or whether it is part of a wall-oven combination. A clear photograph of the whole installation can communicate more than a close-up of the display.',
          'Do not lift an over-the-range appliance down, remove a trim kit or pull a built-in unit out to prepare for a visit. State whether cabinetry, a narrow kitchen, stairs or a high mounting position affects access. If the appliance is in a rental, confirm who can authorize the assessment and proposed repair. These details help discuss the job realistically; they do not guarantee that every installation or model can be serviced.',
        ],
        table: {
          caption: 'Information that helps plan a microwave repair visit',
          headings: ['Installation', 'Tell us before booking', 'Leave in place'],
          rows: [
            [
              'Countertop',
              'Model, accessible condition and where it is used',
              'Housing, cord and internal components',
            ],
            [
              'Over the range',
              'Mounting height, cabinet access, fan or light symptoms',
              'Mounting hardware and the appliance itself',
            ],
            [
              'Built in or combination',
              'Full model details, trim and connected oven arrangement',
              'Trim panels, surrounding cabinetry and connections',
            ],
          ],
        },
      },
      {
        heading: 'Compare a repair assessment with the full replacement decision',
        paragraphs: [
          'A no-heat symptom alone does not tell you whether repair makes financial sense. Consider the appliance’s condition, installation, past performance and the role it serves in your kitchen. If you are comparing replacement, include the practical work around it: dimensions, fit, delivery, removal and any installation requirements. A low advertised appliance price is not automatically the complete cost of returning the kitchen to use.',
          'For repair, ask how any visit or diagnostic charge is explained, what the assessment will cover and how the proposed work will be presented. The initial phone conversation with 5VA is free and carries no obligation to book. On-site diagnosis, parts and repair charges are separate. There is no fixed repair price in this guide because the technician needs to inspect the appliance before discussing suitable work. You can review the proposal and decide before authorizing the repair.',
        ],
        links: [
          {
            label: 'Compare appliance repair with replacement',
            href: '/blog/appliance-repair-or-replace/',
          },
          {
            label: 'See residential microwave repair service',
            href: '/services/microwave-repair/',
          },
        ],
      },
      {
        heading: 'Prepare a useful call or text',
        paragraphs: [
          'Have four details ready: the appliance model if safely accessible, what it does, when the problem started and your ZIP code. Add the installation style and any display message. If the model label is not accessible without moving the appliance, say so; do not dismantle anything to find it. A photograph of the exterior and a photograph of an accessible label are usually easier to understand than a long list of possible failed parts.',
          'For example, a concise request could be: “Household over-the-range microwave in 19116. It starts and counts down but did not heat during the last normal use. No cover has been removed. Here is the model label and installation photo.” Keep personal documents, payment details and unrelated household information out of the message. The conversation helps confirm service suitability and access; it is not a remote diagnosis or a promise that a part will be available immediately.',
        ],
        links: [
          {
            label: 'Prepare for an appliance repair visit',
            href: '/blog/appliance-repair-visit-checklist/',
          },
        ],
      },
      {
        heading: 'At-home microwave repair in the confirmed service area',
        paragraphs: [
          'Call or text 5VA Appliance Repair at +1 (267) 704-8588 daily, 7 AM–8 PM Eastern. Philadelphia service covers ZIP codes 19115 and 19116. The territory also includes all of Montgomery County, Pennsylvania, and the specifically listed nearby PA and New Jersey ZIP codes. Check the service-area list and confirm your address and appliance before booking. A nearby town name does not by itself establish coverage.',
          '5VA visits customers at home for residential appliance repair. There is no shop counter, appliance drop-off, appliance sales or retail spare-parts service. Commercial and restaurant equipment are outside the service. If your household microwave is no longer heating, a clear description and the correct location are the best starting point for discussing an assessment.',
        ],
        links: [
          {
            label: 'Check all service ZIP codes',
            href: '/service-areas/',
          },
          {
            label: 'Philadelphia appliance repair coverage',
            href: '/service-areas/philadelphia/',
          },
          {
            label: 'Montgomery County at-home appliance repair',
            href: '/service-areas/montgomery-county/',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can the turntable work when the microwave is not heating?',
        a: 'Yes. Describe the light, countdown and turntable separately from the heating complaint. Their operation does not identify a failed component; normal controls and model information should be checked before discussing service.',
      },
      {
        q: 'Should I open an unplugged microwave to check a fuse?',
        a: 'No. Internal high-voltage components can remain dangerous after unplugging. Keep the housing closed and leave internal testing and repair to an appropriately qualified professional.',
      },
      {
        q: 'Can I request service for an over-the-range or built-in microwave?',
        a: 'Call or text with the model, installation photo and ZIP code so 5VA can discuss that specific appliance and access. Do not remove the appliance or trim before the visit.',
      },
      {
        q: 'Can you quote the repair from a photo?',
        a: 'A photo helps explain the problem and installation but cannot establish the failed part or final price. Any visit charge is discussed separately, and proposed repair pricing follows an on-site assessment.',
      },
    ],
    sources: [
      {
        title: 'GE Appliances: microwave runs but does not heat',
        url: 'https://products.geappliances.com/appliance/gea-support-search-content?contentId=110',
      },
      {
        title: 'Panasonic: no heat or low heat troubleshooting',
        url: 'https://help.na.panasonic.com/answers/troubleshooting-no-cooking-no-heating-step-by-step-microwave/',
      },
      {
        title: 'FDA: microwave oven safety and damaged doors',
        url: 'https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens',
      },
    ],
  },
  {
    slug: 'washer-not-spinning-philadelphia',
    title: 'Washer Not Spinning? A Philadelphia Repair Guide',
    category: 'Laundry care',
    description:
      'Washer leaves clothes soaking wet or stops before spinning? Separate spin and drainage symptoms, record safe observations, and plan residential washer repair with 5VA.',
    primaryKeyword: 'washer not spinning Philadelphia',
    relatedServices: ['washer-repair', 'dryer-repair'],
    publishedOn: '2026-10-26',
    takeaway:
      'Wet clothes do not identify a failed part. Note whether water remains in the drum, which cycle and spin setting were selected, and whether the machine shook or showed a message. Stop a leaking or violently moving washer and keep doors, panels and connections intact.',
    sections: [
      {
        heading: 'Separate wet laundry from a tub full of water',
        paragraphs: [
          'A washer can leave clothes wetter than usual for several reasons, and the phrase “will not spin” does not describe all of them equally well. Start with what you can already see: is there standing water, or has water left the drum while the clothing remains heavy? Did the machine finish the program, pause with time remaining or display a message? These details help distinguish the complaint without assuming a pump, belt or control has failed.',
          'Do not force a locked front-load door to inspect the water level. Look through the glass if possible or describe the last stage you observed. On a top-loader, wait for the machine to stop and follow its normal lid instructions. A useful report can be as simple as “The wash and rinse seemed normal, but the final spin did not happen; there is no visible water left.” If water remains or the washer leaks, mention that before discussing another cycle.',
        ],
        table: {
          caption: 'Describe the washer’s final stage before choosing a next step',
          headings: ['What you noticed', 'Record for the technician', 'Useful next step'],
          rows: [
            [
              'Clothes wet; no visible standing water',
              'Cycle, spin setting, load type and whether the program ended',
              'Compare normal settings with the exact owner’s manual',
            ],
            [
              'Water still visible in the drum',
              'Last completed stage, message and whether draining was heard',
              'Explain the drainage symptom before another cycle',
            ],
            [
              'Drum slows, pauses or redistributes the load',
              'Whether this happened once or with several ordinary loads',
              'Report the pattern rather than naming a failed part',
            ],
            [
              'Washer bangs, walks or leaks',
              'When it happened and any safely visible damage',
              'Stop use; do not hold or push a running machine',
            ],
          ],
        },
        links: [
          {
            label: 'If water remains, read the washer drainage guide',
            href: '/blog/washer-not-draining/',
          },
          {
            label: 'If water reaches the floor, read the washer leak guide',
            href: '/blog/washer-leaking-water-philadelphia/',
          },
        ],
      },
      {
        heading: 'Read the selected cycle and spin setting',
        paragraphs: [
          'A slower spin is not always a malfunction. Whirlpool explains that Low Spin, No Spin and gentle cycles can leave more water in a load by design. Check the setting you actually used against the garment instructions and your washer’s manual. If a cycle was interrupted by a power outage, record that too. Avoid changing several options at once and then trying to remember which behavior belonged to the original problem.',
          'The goal is to establish whether this is a new change under familiar conditions. Compare today’s result with similar loads on the same program, not with a different machine or a video. A setting explanation may resolve a one-time concern; it does not explain every repeated failure. If an appropriate program repeatedly ends with much wetter laundry than before, that is a useful reason to discuss an assessment even when the display shows no error.',
          'Follow the manual for any permitted recovery or drain-and-spin instruction. Do not use repeated test cycles when there is leaking, abnormal movement, a burning smell or an unresolved electrical concern. If you are unsure whether another cycle is appropriate, describe the situation first and leave the appliance stopped.',
        ],
      },
      {
        heading: 'Consider the load without treating it as a diagnosis',
        paragraphs: [
          'A tightly packed load or a single heavy item can affect spinning. Whirlpool’s model guidance also notes that excessive suds can reduce spin performance. Share whether the problem appeared with a bulky blanket, mixed small and heavy items, a new detergent or a different detergent amount. These are relevant clues, but they do not prove that loading or detergent caused the problem in your machine.',
          'Wait for a normal safe unlock before touching laundry. Do not reach into a moving drum, defeat the lid lock or add more items to a machine that is already leaking or moving violently. If a routine load has been safely removed, note whether the same failure has happened before. You do not need to recreate it with another basket of clothes for a technician to understand the request.',
          'For future use, follow the product’s loading and detergent directions rather than a universal number of towels or capfuls. Washer sizes, fabrics and detergent concentrations vary. A repeatable problem with suitable ordinary loads deserves inspection; repeatedly changing soap or redistributing clothes is not a substitute for finding the cause.',
        ],
      },
      {
        heading: 'Door messages and error codes need the exact model',
        paragraphs: [
          'Write down the full message and model number before clearing the display. Samsung’s support information illustrates why this matters: a code used for an unbalanced load on one model can indicate a door issue on another. A search result for a similar-looking washer cannot settle the meaning. Photograph the message if it is accessible during normal use, and say whether the door or lid seemed to lock normally.',
          'A locked door can be a normal safety response while a washer contains water or is still in a cycle. Samsung advises waiting for the appropriate safe unlock rather than forcing it. This guide does not give emergency-drain, latch-bypass or panel-removal instructions. If the door stays locked, describe the remaining water, cycle state and display message so the next step can be discussed for that product.',
          'Leave the lock, wiring and control assembly intact. An intermittent message still deserves an accurate description even if it disappears later. A technician will need to compare the reported behavior with the appliance’s actual condition; an error label by itself does not establish which part needs replacing.',
        ],
      },
      {
        heading: 'Stop a violently shaking or leaking washer',
        paragraphs: [
          'A machine that walks across the floor, strikes surrounding cabinetry or leaks should not be held in place while it runs. If normal controls can be reached safely, stop the cycle and keep people clear. Do not push it back during spinning or place weight on the lid. If water is near a plug, outlet or electrical equipment, avoid approaching through the water and arrange suitable urgent help before an ordinary repair visit.',
          'For the service request, say whether the washer was recently moved or installed and whether it is freestanding, stacked or in a tight closet. Take an exterior photo from a dry, safe position if useful. Do not tilt a heavy washer, remove transportation hardware based on a generic guide, disconnect a hose or open a drain filter to investigate. Installation, drainage and internal appliance concerns require different assessments; describing access helps avoid assumptions.',
        ],
      },
      {
        heading: 'Send a short record that makes the appointment easier to plan',
        paragraphs: [
          'Gather the brand and model if the label is accessible without moving the washer, the last selected program and what happened before the missed spin. Include whether water remained, an error appeared, unusual movement occurred or the issue affected several ordinary loads. If a short video already captures an intermittent sound, it can help describe the complaint. Do not run a risky cycle just to make a recording.',
          'A practical text could say: “Residential front-load washer in 19115. The final spin has not completed on two ordinary loads. Clothes are wet, there is no visible water in the drum, and the display showed this message. Here is the accessible model label.” If you cannot see the model, say that. Avoid sending payment details, personal documents or guesses about the replacement part.',
          'For a rental or shared household, confirm who can authorize the visit and approve work. Mention an upper-floor laundry, stairs, stacked dryer, narrow doorway or cabinet surround. You do not have to move the appliance or disconnect it in advance. Discuss access with the business so the visit can be planned around the actual installation.',
        ],
        links: [
          {
            label: 'Use the appliance repair visit checklist',
            href: '/blog/appliance-repair-visit-checklist/',
          },
          {
            label: 'See household washing machine repair service',
            href: '/services/washer-repair/',
          },
        ],
      },
      {
        heading: 'Ask the right questions about diagnosis and repair cost',
        paragraphs: [
          'A wet load cannot produce a reliable fixed repair quote. Ask what a visit or diagnostic fee covers, how findings will be explained and when you can review the proposed work. A useful assessment distinguishes the complaint from the cause and considers the appliance’s condition and installation. It may show that a repair is unsuitable or that another issue needs attention first. Do not buy a pump or belt simply because another household had a similar symptom.',
          'The first call to 5VA is free, with no obligation to book. Any on-site diagnosis, parts and repair charges are separate and discussed for the specific job. There is no universal price or warranty promise in this guide. If you are considering replacement, compare the proposed repair with the complete alternative, including delivery, installation, removal and fit. 5VA repairs appliances and does not sell replacement machines or retail spare parts.',
        ],
        links: [
          {
            label: 'Review the repair-or-replace decision guide',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Avoid making the dryer solve the washer problem',
        paragraphs: [
          'Very wet laundry can make it hard to judge a dryer complaint. Tell the technician whether clothes entered the dryer wetter than usual or whether drying performance changed even after normal washer loads. Keep the two observations separate: a washer spin concern does not establish a dryer fault, and a heating concern does not establish why the washer failed to extract water.',
          'Follow the dryer’s loading and use instructions rather than compensating with overloaded or repeated long cycles. If both appliances appear affected, describe both during the first conversation. That helps clarify the requested work without assuming a single shared cause or booking the wrong appliance service.',
        ],
        links: [
          {
            label: 'If heat has changed, read the dryer-not-heating guide',
            href: '/blog/dryer-not-heating-philadelphia/',
          },
        ],
      },
      {
        heading: 'Arrange residential washer repair in the covered area',
        paragraphs: [
          'Call or text +1 (267) 704-8588 daily, 7 AM–8 PM Eastern, with the washer details and ZIP code. 5VA Appliance Repair comes to customers’ homes. Philadelphia coverage is 19115 and 19116; service also includes all Montgomery County, PA, and the specifically listed nearby Pennsylvania and New Jersey ZIP codes. Confirm your exact address and appointment before planning around a visit.',
          'The service is for residential household appliances. Laundromat and other commercial equipment, appliance sales, retail parts sales and customer drop-off are not offered. If your washer repeatedly misses the spin stage, a clear symptom history and model information let you discuss an appropriate assessment without dismantling the machine first.',
        ],
        links: [
          {
            label: 'Check the complete PA and NJ service territory',
            href: '/service-areas/',
          },
          {
            label: 'See Northeast Philadelphia coverage',
            href: '/service-areas/northeast-philadelphia/',
          },
          {
            label: 'See Montgomery County coverage',
            href: '/service-areas/montgomery-county/',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does a washer that will not spin always need a new motor?',
        a: 'No. A symptom does not identify a failed component. Settings, loading, water remaining in the drum and the actual appliance condition all matter. Record the behavior and discuss an inspection before buying parts.',
      },
      {
        q: 'Should I keep running drain-and-spin cycles?',
        a: 'Follow only the normal recovery instructions for your exact model. Do not repeat cycles on a leaking, violently shaking or electrically suspect machine. If the problem persists, leave it stopped and discuss service.',
      },
      {
        q: 'What if the door is locked and clothes are still inside?',
        a: 'Do not force the door or bypass the lock. State whether water remains and which message is displayed. A safe unlock or recovery procedure depends on the model and condition.',
      },
      {
        q: 'Do you repair apartment washers and stacked laundry?',
        a: 'Describe the household appliance, installation, model and ZIP code when contacting 5VA. Discuss access and who can authorize work before booking. Commercial laundry equipment is outside the service.',
      },
    ],
    sources: [
      {
        title: 'Whirlpool: front-load washer not spinning',
        url: 'https://producthelp.whirlpool.com/Laundry/Washers/Front_Load_Washers/Cycle_Concerns/Not_Turning%2C_Tumbling%2C_or_Spinning/Not_Spinning_-_Front_Load_Washer',
      },
      {
        title: 'Samsung: washing machine information and error codes',
        url: 'https://www.samsung.com/us/support/troubleshoot/TSG10000997/',
      },
      {
        title: 'Samsung: a washer door that remains locked',
        url: 'https://www.samsung.com/us/support/troubleshoot/TSG10007180/',
      },
    ],
  },
];
const inputs: JournalInput[] = [
  ...newGuides,
  ...localGuides,
  ...existingArticles.map((article) => ({ ...article, ...metadata[article.slug], faqs: [] })),
];
export const articles: JournalArticle[] = inputs.map((article) => {
  const words = [
    article.title,
    article.description,
    article.takeaway,
    ...article.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.table ? [s.table.caption, ...s.table.headings, ...s.table.rows.flat()] : []),
    ]),
    ...article.faqs.flatMap((f) => [f.q, f.a]),
  ]
    .join(' ')
    .trim()
    .split(/\s+/).length;
  return {
    ...article,
    seoTitle: titles[article.slug],
    wordCount: words,
    readTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
    icon: services.find((s) => s.slug === article.relatedServices[0])?.icon || 'tools',
    group:
      article.category === 'Laundry care'
        ? 'laundry'
        : ['Repair planning', 'Home decisions'].includes(article.category)
          ? 'planning'
          : 'kitchen',
    image: `/images/blog/${article.slug}-1200.webp`,
    imageAlt: imageDescriptions[article.slug],
  };
});
export function relatedArticles(slug: string, limit = 3): JournalArticle[] {
  const current = articles.find((article) => article.slug === slug);
  return articles
    .filter((article) => article.slug !== slug)
    .map((article) => ({
      article,
      score:
        article.relatedServices.filter((service) => current?.relatedServices.includes(service))
          .length *
          2 +
        Number(article.group === current?.group),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}
