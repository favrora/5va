import type { JournalArticle } from './journal.ts';

type Guide = Omit<
  JournalArticle,
  'seoTitle' | 'wordCount' | 'readTime' | 'icon' | 'group' | 'image' | 'imageAlt'
>;

export const autumnGuides: Guide[] = [
  {
    slug: 'ice-maker-not-making-ice-philadelphia',
    title: 'Ice Maker Not Making Ice? What to Check First',
    category: 'Kitchen care',
    description:
      'No ice or ice that will not dispense? Separate the symptoms, check safe owner controls, and plan residential ice maker repair in the covered Philadelphia area.',
    primaryKeyword: 'ice maker not making ice Philadelphia',
    relatedServices: ['ice-maker-repair', 'refrigerator-repair', 'freezer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'First distinguish an empty ice bin from a full bin that will not dispense. Check the model’s normal ice settings and note any recent filter or water-supply change. Persistent trouble needs an assessment, not an assumed replacement ice maker.',
    sections: [
      {
        heading: 'Is the refrigerator failing to make ice or failing to dispense it?',
        paragraphs: [
          'An ice dispenser that does nothing does not automatically mean ice production has stopped. Look at the bin only if your manual provides normal, accessible user access. If there are cubes inside, describe the problem as “ice in the bin, nothing through the door.” If the bin is empty, say when you last saw a fresh batch. These are different starting points for a repair request.',
          'Also distinguish no production from production that cannot keep up with use. A household that emptied the bin for guests has a different history from one that has seen no new cubes for several days. Tell us what changed before the problem began. There is no need to name a failed component or buy one before the appliance has been inspected.',
        ],
        table: {
          caption: 'Three ice problems that should be described differently',
          headings: ['What you observe', 'Useful detail', 'Next step'],
          rows: [
            [
              'No new ice in the bin',
              'Last fresh batch and any cooling change',
              'Review normal controls and discuss an ice-making assessment',
            ],
            [
              'Ice is present but will not dispense',
              'Whether water dispenses and any message shown',
              'Describe a dispenser problem rather than an empty-bin problem',
            ],
            [
              'Some ice, less than usual',
              'Recent heavy use, installation or filter work',
              'Compare with the model’s expected recovery before assuming failure',
            ],
          ],
        },
      },
      {
        heading: 'Check the owner controls before arranging a repair',
        paragraphs: [
          'Whirlpool identifies an ice maker switched off, restricted water supply, freezer temperature and water-filter concerns as possible explanations for lost production. Start with the settings and indicators you can read without moving the refrigerator. Use the manual for the exact model: an ice-off control, a dispenser lock and the main refrigerator controls do not necessarily do the same thing.',
          'A recent filter change is particularly useful history. Note the filter type, when it was fitted and whether normal water dispensing changed at the same time. Follow only the manufacturer’s routine user instructions for checking that filter. Do not disconnect water lines, reach behind a heavy refrigerator or repeatedly operate an unfamiliar reset sequence. An accessible setting check is different from testing a water valve or internal wiring.',
        ],
      },
      {
        heading: 'Explain what the rest of the refrigerator is doing',
        paragraphs: [
          'Mention whether refrigerated food, frozen food or both seem warmer than usual. An ice complaint with a wider cooling concern should not be presented as an isolated dispenser fault. If you already have a normal temperature reading, record the value and where it was measured. Do not rely on a working display as proof that the compartments are cooling correctly.',
          'If the water dispenser still works, report that observation without deciding that it rules out every water-related cause. Likewise, a sound from the ice-making area does not identify a particular part. A useful description is “the freezer seems normal, water dispenses, and no fresh ice has appeared since the filter change.” It gives the visit a clear starting point while leaving the diagnosis open.',
        ],
        links: [
          {
            label: 'What to do when refrigerator cooling has changed',
            href: '/blog/refrigerator-not-cooling/',
          },
          {
            label: 'If the freezer is also losing temperature',
            href: '/blog/freezer-not-freezing/',
          },
        ],
      },
      {
        heading: 'Leave frozen parts and hidden connections alone',
        paragraphs: [
          'Do not force a frozen bin, chip ice from a mechanism with a knife, apply a heat gun or try to defeat a switch. Leave covers and water connections intact. A photograph of the accessible bin, display or visible leak can be useful; a photograph is not worth pulling the appliance out or placing a hand near moving components.',
          'Stop using the affected feature if there is an active leak or a damaged mechanism. If water is near electrical equipment, avoid contact and seek appropriate help. Tell us about the leak before arranging a visit, including whether it is still happening. Do not assume that a towel on the floor has addressed the cause, or keep running the dispenser to recreate the problem.',
        ],
      },
      {
        heading: 'A refrigerator ice maker and a separate ice machine need different planning',
        paragraphs: [
          'Identify whether this is an ice maker inside a refrigerator, a household under-counter ice machine or another residential unit. For a built-in appliance, an exterior photograph can show the installation and access. Mention a narrow opening, cabinetry or a connected drain without removing trim or moving the unit yourself.',
          '5VA assesses refrigerator ice makers and suitable household ice-making appliances. Suitability depends on the unit and installation, so share the model before booking. Restaurant, bar, hotel and other commercial ice machines are outside our service. We provide repair service; we do not sell ice machines, replacement appliances or retail spare parts.',
        ],
        links: [
          {
            label: 'See the scope of household ice maker repair',
            href: '/services/ice-maker-repair/',
          },
        ],
      },
      {
        heading: 'Decide on a visit with the whole repair question in view',
        paragraphs: [
          'For a refrigerator, the repair decision concerns the whole appliance and the role of the ice feature. Explain whether normal food storage still works and whether you have had related problems before. For a separate built-in unit, include the fit and access in any comparison with replacement. An online price for a loose part is not a quote for diagnosis, installation and a completed repair.',
          'Ask what any diagnostic visit involves and how proposed work will be explained. The initial call to 5VA is free and carries no obligation to book. Visit and repair charges are separate; the repair price follows an on-site inspection. You can discuss the proposed work before authorizing it, rather than committing to a component based only on an empty ice bin.',
        ],
        links: [
          {
            label: 'Compare an assessed repair with replacement',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Request residential ice maker repair in the covered area',
        paragraphs: [
          'Send the model, your ZIP code, the last time you saw fresh ice and whether water still dispenses. A short message is enough to begin: “Refrigerator ice maker has made no new ice since Tuesday; water still dispenses; filter was changed last week.” Add an accessible exterior photograph if it clarifies the setup. We confirm the address, appliance and appointment before a visit.',
          'Call or text +1 (267) 704-8588 every day, 7am–8pm. Home visits cover Philadelphia ZIPs 19115 and 19116, all Montgomery County, PA, and the listed nearby Pennsylvania and New Jersey ZIPs. There is no customer drop-off location. Check the full territory before planning an appointment outside those two Philadelphia ZIPs.',
        ],
        links: [
          { label: 'Check the complete service territory', href: '/service-areas/' },
          {
            label: 'See Montgomery County home-visit coverage',
            href: '/service-areas/montgomery-county/',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does no ice mean the entire ice maker must be replaced?',
        a: 'No. Settings, water delivery, cooling and the actual mechanism can produce similar symptoms. An assessment is needed before recommending a component or a replacement.',
      },
      {
        q: 'What if there is ice in the bin but nothing comes out?',
        a: 'Tell us that ice production and dispensing appear to be different problems. Note any lock indicator or sound, follow the model’s normal user instructions and do not force a frozen mechanism.',
      },
      {
        q: 'Do you repair commercial ice machines?',
        a: 'No. 5VA provides residential household appliance repair. Share the model and installation details to discuss a household ice-making unit before booking.',
      },
    ],
    sources: [
      {
        title: 'Whirlpool: ice maker not working',
        url: 'https://producthelp.whirlpool.com/Refrigeration/Full-Size_Refrigerators/Product_Info/Product_Assistance/Ice_Maker_Not_Working_-_Troubleshooting',
      },
      {
        title: 'GE Appliances: refrigerator not dispensing ice',
        url: 'https://products.geappliances.com/appliance/gea-support-search-content?contentId=21757',
      },
      {
        title: 'GE Appliances: ice maker support questions',
        url: 'https://www.geappliances.com/ge/service-and-support/faq-icemakers.htm',
      },
    ],
  },
  {
    slug: 'dryer-wont-start-philadelphia',
    title: 'Dryer Won’t Start? What to Check Before Calling',
    category: 'Laundry care',
    description:
      'Dryer has no power or lights up but will not spin? Check normal controls and prepare for residential dryer repair in the covered Philadelphia area.',
    primaryKeyword: 'dryer wont start Philadelphia repair',
    relatedServices: ['dryer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'Separate a blank control panel from a dryer that responds but will not turn the drum. Check only normal door, cycle and lock controls described in the manual. A persistent no-start problem needs assessment; do not bypass a door switch or safety device.',
    sections: [
      {
        heading: 'Describe exactly what happens after you press Start',
        paragraphs: [
          '“The dryer is not working” can mean several different things. Does the panel stay dark? Does it light up but ignore Start? Is there a click, a brief hum or a message? Did the drum begin turning and then stop? Note the sequence from the last normal attempt without repeatedly trying to reproduce a fault.',
          'A dryer that turns normally but leaves clothes cold belongs to a different symptom group. Making that distinction early helps you choose the right service conversation. It also avoids arriving with an assumed heating problem when the machine never starts a cycle at all. A short description of the controls and drum is more useful than a guessed part name.',
        ],
        table: {
          caption: 'Useful descriptions of a dryer that will not start',
          headings: ['Response', 'Record', 'Avoid assuming'],
          rows: [
            [
              'No display or indicator',
              'Whether other controls respond and when it last worked',
              'That a blank display proves the control board has failed',
            ],
            [
              'Display works, drum stays still',
              'Cycle, lock icon and response to the normal Start procedure',
              'That the appliance has a heating fault',
            ],
            [
              'Click or hum, no cycle',
              'The sound and whether the machine stops responding',
              'That one sound identifies a motor or belt',
            ],
            [
              'Starts, then stops',
              'Approximate elapsed time and any code',
              'That repeatedly restarting it is a repair',
            ],
          ],
        },
        links: [
          {
            label: 'If the drum turns but the dryer does not heat',
            href: '/blog/dryer-not-heating-philadelphia/',
          },
        ],
      },
      {
        heading: 'Rule out a normal control setting using the correct manual',
        paragraphs: [
          'Whirlpool’s no-start guidance includes the door latch, cycle selection, control lock and the model’s normal Start-button operation. Check that clothing is not caught in the door and that the door closes normally. Do not slam it, hold it shut or manipulate the latch. Read the selected program rather than assuming every position on a dial starts a drying cycle.',
          'Some controls need a deliberate press or hold, and lock symbols can explain an unresponsive panel. Samsung also distinguishes child-lock concerns from other start or spin problems. Use the instructions for the exact model; a button combination copied from another dryer may not apply. If the ordinary procedure does not resolve the problem, record the response and stop there.',
        ],
      },
      {
        heading: 'A power concern needs a different conversation from a cycle concern',
        paragraphs: [
          'Tell us whether the problem followed an outage, a move, installation work or an interrupted cycle. If a breaker has tripped, that is useful history. Do not keep resetting a breaker, test a live outlet, use an extension lead as a workaround or move the dryer to inspect its supply. An electrical-supply concern may need a qualified electrician rather than an appliance component.',
          'If you smell gas, see smoke or notice damaged electrical equipment, stop using the appliance and seek appropriate urgent assistance. Do not operate it to collect a video. For an ordinary repair request, simply explain whether the dryer is gas or electric and what you observed before stopping. You do not need to expose a connection to identify the fuel type.',
        ],
      },
      {
        heading: 'Do not bypass the door switch or a safety device',
        paragraphs: [
          'A no-start problem can make online shortcuts tempting, especially when wet laundry is waiting. Do not bridge a switch, replace a safety device with a wire or run the dryer with a cover removed. A machine starting after a bypass would not establish that it is safe to use, or explain why the original protection stopped operation.',
          'Leave component testing and replacement to an assessment of the actual appliance. An online listing that matches the brand is not enough to establish the correct part. The model, symptom history and installation all matter. 5VA repairs household appliances and does not operate a retail parts counter; buying a guessed component first is not required to request service.',
        ],
      },
      {
        heading: 'Prepare the laundry area without moving the appliance',
        paragraphs: [
          'For stacked units, a laundry closet or a machine on a pedestal, send a photo of the full setup. Mention stairs, a narrow doorway or limited space in front of the dryer. Leave the appliance, stacking hardware, vent and connections in place. Do not unstack laundry equipment or remove a door just to prepare for an appointment.',
          'If the model label is safely visible, photograph it. If it is not, say so. Remove ordinary belongings from the access path, but leave repair access to be discussed before the visit. In an apartment or rental, identify who can approve the work and how the technician will enter. These practical details help plan the appointment without turning preparation into a dismantling task.',
        ],
        links: [
          {
            label: 'Prepare for an appliance repair visit',
            href: '/blog/appliance-repair-visit-checklist/',
          },
        ],
      },
      {
        heading: 'Discuss diagnosis before deciding to replace the dryer',
        paragraphs: [
          'A dryer that will not begin a cycle is not automatically beyond repair. Explain its approximate age, previous repairs and whether it had other problems before this one. For a stacked installation, a replacement decision also involves fit and the surrounding equipment. Compare an assessed repair with the complete practical replacement cost rather than one advertised appliance price.',
          'The initial call to 5VA is free, with no obligation to book. Any visit or diagnostic charge is separate, and the repair price follows an on-site inspection. Ask how the proposed work will be explained before you authorize it. A phone description can establish the right request and access needs; it does not establish the final repair or guarantee immediate parts availability.',
        ],
        links: [
          { label: 'See residential dryer repair', href: '/services/dryer-repair/' },
          {
            label: 'Consider repair versus replacement',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Request a home visit in the covered Philadelphia area',
        paragraphs: [
          'A useful first message is: “Household electric dryer in 19115. Panel lights up, but the drum does not move after the normal Start procedure. Here is the model and a photo of the laundry closet.” Add any displayed code and when it last worked. You do not need to diagnose the problem to call.',
          'Call or text +1 (267) 704-8588 every day, 7am–8pm. 5VA visits homes in Philadelphia 19115 and 19116, all Montgomery County, PA, and the listed nearby PA and NJ ZIP codes. We confirm the appliance, address and appointment before a visit. Commercial laundry equipment, appliance sales, retail parts sales and customer drop-off are not offered.',
        ],
        links: [{ label: 'Check the exact home-visit territory', href: '/service-areas/' }],
      },
    ],
    faqs: [
      {
        q: 'Why do the dryer lights work but the drum will not start?',
        a: 'A responsive display does not identify the cause. Check only normal cycle, door and lock controls in the exact model’s manual. If it persists, describe the response and arrange an assessment.',
      },
      {
        q: 'Should I keep pressing Start if the dryer hums?',
        a: 'Do not repeatedly try to force a fault to clear. Stop the appliance, note what happened and discuss service. Never bypass a door switch or safety device.',
      },
      {
        q: 'Can I book repair for a stacked household dryer?',
        a: 'Share the model, ZIP code and full installation photo so suitability and access can be discussed before booking. Leave stacked equipment and its connections in place.',
      },
    ],
    sources: [
      {
        title: 'Whirlpool: dryer not starting or operating',
        url: 'https://producthelp.whirlpool.com/Laundry/Dryers/Product_Info/Dryer_Product_Assistance/Dryer_Not_Starting_or_No_Operation',
      },
      {
        title: 'Samsung: dryer turns on but will not start or spin',
        url: 'https://www.samsung.com/us/support/troubleshoot/TSG10007168/',
      },
      {
        title: 'Samsung: dryer loses power or will not turn on',
        url: 'https://www.samsung.com/us/support/troubleshoot/TSG10000730/',
      },
    ],
  },
  {
    slug: 'dishwasher-not-cleaning-dishes',
    title: 'Dishwasher Not Cleaning Dishes? What to Do Next',
    category: 'Kitchen care',
    description:
      'Food on plates, cloudy glasses or detergent left behind? Compare symptoms and plan in-home dishwasher repair in the covered Philadelphia area.',
    primaryKeyword: 'dishwasher not cleaning dishes repair Philadelphia',
    relatedServices: ['dishwasher-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'Food residue, a film on glassware and an unopened detergent compartment are different observations. Review loading and model-approved routine care first. If poor washing persists, or the dishwasher leaks, fails to fill or stops mid-cycle, discuss an assessment.',
    sections: [
      {
        heading: 'Name what is left behind at the end of the cycle',
        paragraphs: [
          'Take a moment before describing every poor result as “not cleaning.” Are there recognizable food particles on plates? A cloudy or chalky film on glasses? Detergent left in the dispenser? Are the dishes clean but wet? The kind of residue and where it appears provide a more useful starting point than a blanket report that the dishwasher needs a new pump.',
          'Notice whether the problem affects the whole load or mostly one rack. Keep a photo of a representative plate or glass and a photo of how the rack was loaded. You do not need to save a full dirty load for the technician. Explain whether the result changed suddenly, became gradually worse or began after a change in detergent, installation or nearby plumbing.',
        ],
        table: {
          caption: 'Different results need different descriptions',
          headings: ['Result after washing', 'What to record', 'Useful distinction'],
          rows: [
            [
              'Visible food residue',
              'Which rack and whether the whole load is affected',
              'A washing concern, not simply a drying concern',
            ],
            [
              'Film or spots',
              'Detergent, rinse aid and recent changes',
              'Appearance alone does not identify a failed component',
            ],
            [
              'Detergent remains',
              'Cycle completion and items near the dispenser',
              'A blocked door differs from a dispenser that fails repeatedly',
            ],
            [
              'Water remains in the tub',
              'Water level and whether the cycle ended',
              'Describe the drainage problem as well as the dirty dishes',
            ],
          ],
        },
        links: [
          {
            label: 'If dirty dishes come with standing water',
            href: '/blog/dishwasher-not-draining/',
          },
        ],
      },
      {
        heading: 'Review loading before assuming a mechanical fault',
        paragraphs: [
          'Large cookware and closely packed dishes can interfere with the normal wash pattern. Consult the loading diagrams for your model and check that ordinary rack contents are not obstructing the detergent compartment or the visible path of a spray arm. Make these observations only when the machine is stopped and safe to open. Do not defeat the door switch to watch it run.',
          'Use the cycle and detergent intended for the load and appliance. More detergent is not automatically a better wash, and hand dishwashing liquid is not a substitute for automatic-dishwasher detergent. If you recently changed a product, include that detail in the repair request. There is no reason to mix cleaning chemicals or attempt an improvised chemical treatment to prove that the machine has a fault.',
        ],
      },
      {
        heading: 'Routine filter care depends on the dishwasher model',
        paragraphs: [
          'GE and Whirlpool both identify filters and water reaching the dishes as relevant to cleaning performance. Some dishwashers have a user-removable filter; others have a different arrangement. Follow the exact model’s routine cleaning instructions rather than assuming that a part which twists on another machine should twist on yours.',
          'Let the appliance cool and take care around broken glass or sharp debris. Do not remove covers, reach into a pump area or dismantle the sump. If a routine user part does not release as the manual describes, leave it in place. Tell us whether filter care was recently performed and whether the result changed afterward. A photo can document an accessible concern without turning cleaning into a repair attempt.',
        ],
      },
      {
        heading: 'Persistent poor washing may need more than another cycle',
        paragraphs: [
          'A dishwasher can complete its displayed program without delivering the result you expect. If a sensible loading change and ordinary model-approved care do not resolve a recurring problem, an inspection is a reasonable next step. Explain whether it appears to fill, whether it stops early and whether new sounds or messages occur. These observations help describe the job; they do not establish which component needs replacement.',
          'If you notice an active leak, stop using the dishwasher rather than repeatedly running it to see whether the dishes improve. Report the leak and any water near electrical equipment before arranging the visit. Similarly, do not pull a built-in machine out to inspect its hoses. Connection and installation concerns can be discussed with the appliance in place.',
        ],
      },
      {
        heading: 'A film on glasses does not prove the same fault in every home',
        paragraphs: [
          'Cleaning products, normal maintenance and the household’s water conditions can all be relevant history. Do not assume every Philadelphia home has the same water conditions, or that a cloudy glass proves that a heater or circulation component has failed. Record any product change and whether the same issue appears on different loads. Avoid treating a regional generalization as a diagnosis.',
          'A useful request could be: “The upper rack has food residue after the normal cycle; the lower rack is better. The detergent compartment opens, and there is no standing water at the end.” A different request might describe film on otherwise clean glassware. Clear observations help discuss whether an appliance assessment fits the concern before you commit to a visit.',
        ],
      },
      {
        heading: 'Prepare for the visit and the repair decision',
        paragraphs: [
          'Send the model label if it is safely accessible, a picture of the installation and an example of the result. Mention recent kitchen work, the first affected cycle and who can approve the repair. Clear an ordinary access path without removing the kickplate, cabinet trim or connections. If it is a rental kitchen, confirm access arrangements before the appointment.',
          'The initial conversation with 5VA is free and carries no obligation to book. Visit and diagnostic charges are separate, and a repair price follows an on-site inspection. Ask what proposed work addresses and review it before authorizing the repair. Comparing repair with replacement should include the existing cabinet fit and the work involved in replacing an installed appliance, not only the price of a dishwasher in a store.',
        ],
        links: [
          {
            label: 'See household dishwasher repair service',
            href: '/services/dishwasher-repair/',
          },
          {
            label: 'Plan an appliance repair visit',
            href: '/blog/appliance-repair-visit-checklist/',
          },
        ],
      },
      {
        heading: 'Arrange dishwasher repair in the covered Philadelphia area',
        paragraphs: [
          'Call or text +1 (267) 704-8588 every day, 7am–8pm. Include the symptom, model and ZIP code; we confirm the address, appliance and appointment before visiting. 5VA serves Philadelphia 19115 and 19116, all Montgomery County, PA, and the listed nearby Pennsylvania and New Jersey ZIP codes.',
          'This is residential household appliance repair at your home. We do not repair commercial restaurant dishwashers or warewashers, sell appliances or retail spare parts, or accept customer drop-off. For a built-in household dishwasher, leave it installed and describe the problem without dismantling the kitchen first.',
        ],
        links: [
          { label: 'Check the exact PA and NJ home-visit coverage', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does dirty dishware mean the dishwasher needs a new pump?',
        a: 'No. Similar results can have different explanations. Describe loading, residue, drainage and cycle behavior; a component recommendation needs assessment of the actual appliance.',
      },
      {
        q: 'Should I add extra detergent to fix poor cleaning?',
        a: 'Use only the amount and product described by the appliance and detergent instructions. Do not use hand dishwashing liquid or mix cleaning chemicals as a repair experiment.',
      },
      {
        q: 'Do I need to remove a built-in dishwasher before a visit?',
        a: 'No. Leave the appliance, trim and connections in place. Share the model, installation photo and any access constraints before booking.',
      },
    ],
    sources: [
      {
        title: 'GE Appliances: poor dishwasher wash performance',
        url: 'https://products.geappliances.com/appliance/gea-support-search-content?contentId=17452',
      },
      {
        title: 'Whirlpool: why a dishwasher may not clean dishes properly',
        url: 'https://www.whirlpool.com/blog/kitchen/dishwasher-not-cleaning.html',
      },
    ],
  },
  {
    slug: 'oven-not-reaching-temperature',
    title: 'Oven Not Reaching Temperature? Preheating Explained',
    category: 'Kitchen care',
    description:
      'Oven heats slowly or cooks unevenly? Understand temperature cycling and prepare for an in-home oven assessment in the covered Philadelphia area.',
    primaryKeyword: 'oven not reaching temperature repair Philadelphia',
    relatedServices: ['oven-stove-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'An oven’s set temperature, preheat display and actual cooking performance are not the same observation. Record the mode, target and time to the normal preheat signal. Persistent slow heating or changed results need model-specific assessment, not an arbitrary calibration adjustment.',
    sections: [
      {
        heading: 'Separate no heat, slow preheating and uneven cooking',
        paragraphs: [
          'An oven that remains cold is different from one that takes longer to preheat, or one that signals ready but no longer cooks familiar recipes as expected. State which problem you have. If only one cooking mode is affected, say which one and whether the cooktop still operates normally. Avoid testing every function repeatedly just to fill out a checklist.',
          'Use the most recent normal attempt as your starting point: mode selected, target temperature, approximate elapsed time and the response on the display. A short record makes the problem easier to discuss than “the oven thermostat is broken.” It also helps separate a cooking-result concern from a control, door or complete no-heat concern.',
        ],
        table: {
          caption: 'Describe the temperature concern before choosing a repair',
          headings: ['Concern', 'Useful observation', 'What it does not establish'],
          rows: [
            [
              'Oven stays cold',
              'Mode, display response and any code',
              'Which heating or control component has failed',
            ],
            [
              'Preheat seems much slower',
              'Target, time to signal and recent change',
              'A universal preheat deadline for every model',
            ],
            [
              'Cooking results have changed',
              'A familiar recipe, mode and rack position',
              'That one low reading proves a faulty sensor',
            ],
            [
              'Only one mode seems affected',
              'Bake, convection or broil behavior from normal use',
              'That working cooktop burners prove the oven is sound',
            ],
          ],
        },
        links: [{ label: 'If the oven does not heat at all', href: '/blog/oven-not-heating/' }],
      },
      {
        heading: 'Normal oven temperature cycling can be misleading',
        paragraphs: [
          'GE explains that gas and electric ovens cycle heat on and off around the selected temperature. A single reading at one moment does not describe the whole cooking cycle. Opening the door and the position of a measurement can also affect what is observed. Do not diagnose a sensor from a brief reading alone.',
          'Use your model’s instructions for evaluating performance. Samsung, for example, gives a specific preheat procedure for the ovens covered by its support guidance; that is not a universal test for every brand or installation. If you already observed a delayed ready signal during ordinary use, record it. You do not need to run new experiments or leave a questionable oven operating unattended.',
        ],
      },
      {
        heading: 'Review the cooking setup before changing calibration',
        paragraphs: [
          'Think about what changed at the same time as the cooking results: the program, rack position, cookware, recipe quantity or a recent installation. Compare like with like when describing the concern. A tray on a different rack or a different cooking mode is useful context, not evidence that the appliance must be recalibrated.',
          'Check the normal temperature units and mode shown on the controls. Consult the exact user manual before changing any offset or calibration setting. An adjustment intended to compensate for cooking preference is not a substitute for finding a new fault. Repeatedly changing offsets can also make the original symptom harder to explain. If someone has already adjusted a setting, tell the technician what was changed.',
        ],
      },
      {
        heading: 'Working lights or cooktop burners do not diagnose the oven',
        paragraphs: [
          'Tell us whether this is a gas, electric or dual-fuel range, or a separate wall oven. If the cooktop works while the oven does not, include that observation. Different functions can have different operating requirements, so a working light, display or burner should not be treated as a complete check of the appliance.',
          'Do not measure a live supply, remove panels, adjust a gas valve or attempt ignition repairs. A recent move, electrical work or installation change belongs in the request because it may change the kind of help needed. If there is a gas smell, smoke or another immediate hazard, stop using the appliance and seek appropriate urgent assistance. An oven appointment should not be used in place of handling an active hazard.',
        ],
      },
      {
        heading: 'Plan around the installation and the food you need to cook',
        paragraphs: [
          'For a built-in oven, photograph the whole cabinet arrangement and any accessible model label. State whether it is a single oven, double oven or a combination unit. Do not pull it from the wall, remove trim or detach a range to prepare for service. Access and installation details should be discussed before the visit.',
          'If an upcoming meal depends on the oven, explain the timing when asking about availability. A requested date is not a confirmed appointment, and an assessment is not a promise that a repair can be completed before a particular dinner. Make alternative cooking arrangements if performance is unreliable rather than planning around a replacement part that has not been diagnosed or sourced.',
        ],
        links: [
          {
            label: 'Prepare the model and access details for a visit',
            href: '/blog/appliance-repair-visit-checklist/',
          },
        ],
      },
      {
        heading: 'Make the repair decision after an assessment',
        paragraphs: [
          'Explain whether this is a new symptom, whether it has worsened and whether the appliance has had related work before. For a replacement comparison, consider cabinet dimensions, matching a double-oven arrangement and installation requirements. An advertised price for a new oven is not necessarily the complete cost of restoring the kitchen to use.',
          'The initial phone conversation with 5VA is free and carries no obligation to book. Diagnostic visits and repair charges are separate. The repair price follows an on-site inspection, with proposed work discussed before you authorize it. We do not sell replacement ovens or retail spare parts. The decision concerns the model, condition and work actually proposed for your appliance.',
        ],
        links: [
          {
            label: 'See oven, stove and cooktop repair service',
            href: '/services/oven-stove-repair/',
          },
          {
            label: 'Compare repair with the full replacement decision',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Request an oven assessment in the covered area',
        paragraphs: [
          'A useful message is: “Electric wall oven in 19116. Bake now takes much longer to signal ready, and a familiar recipe stays underdone. Here is the model; no panels have been removed.” Add the target temperature, approximate timing, any code and a full exterior photo. The observation is useful even if you have no separate temperature measurement.',
          'Call or text +1 (267) 704-8588 every day, 7am–8pm. 5VA provides residential home visits in Philadelphia 19115 and 19116, all Montgomery County, PA, and the listed nearby PA and NJ ZIP codes. Confirm the exact address and appointment before planning around a visit. Commercial kitchens and customer drop-off are outside our service.',
        ],
        links: [{ label: 'Check the confirmed home-visit territory', href: '/service-areas/' }],
      },
    ],
    faqs: [
      {
        q: 'Does an oven always stay at exactly the displayed temperature?',
        a: 'No. Ovens cycle heat during operation, and the displayed value can have a model-specific meaning. Use the manufacturer’s instructions rather than diagnosing a fault from one momentary reading.',
      },
      {
        q: 'Should I adjust calibration if baking suddenly changes?',
        a: 'Do not use an arbitrary offset to mask a new problem. Review the model’s normal settings and record what changed. Persistent performance concerns need assessment before a repair recommendation.',
      },
      {
        q: 'Does a working gas cooktop rule out an oven problem?',
        a: 'No. Describe the working and non-working functions separately. Do not adjust gas components or attempt ignition repairs to test an assumption.',
      },
    ],
    sources: [
      {
        title: 'GE Appliances: oven temperature above or below the setting',
        url: 'https://products.geappliances.com/appliance/gea-support-search-content?contentId=36977',
      },
      {
        title: 'Samsung: oven temperature and preheating concerns',
        url: 'https://www.samsung.com/us/support/troubleshoot/TSG10001298/',
      },
      {
        title: 'GE Appliances: oven cycling light operation',
        url: 'https://products.geappliances.com/appliance/gea-support-search-content?contentId=21201',
      },
    ],
  },
  {
    slug: 'washer-shaking-during-spin',
    title: 'Washer Shaking During Spin? When to Stop',
    category: 'Laundry care',
    description:
      'Washer banging or moving on spin? Know when to stop, record the load and installation history, and plan household washer repair near Philadelphia.',
    primaryKeyword: 'washer shaking during spin repair Philadelphia',
    relatedServices: ['washer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'Stop a washer that moves violently, strikes nearby surfaces or leaks. Do not hold it in place or repeat high-speed cycles. Record whether the shaking began after installation, affects particular loads or now recurs with ordinary laundry, then discuss the appropriate assessment.',
    sections: [
      {
        heading: 'A little movement and a washer that walks are different concerns',
        paragraphs: [
          'Some movement can occur during normal operation, but a machine moving across the floor or striking cabinetry should not be treated as a sound to ignore. If the washer is shaking violently, use the normal stop control from a safe position. Keep clear until it stops; do not brace it with your body, climb on it or reach behind it while it moves.',
          'Describe what you saw during the last affected load. Did the cabinet shift, did the machine bang without moving, or did it stop and show a message? Explain whether water escaped. These observations help define the concern without deciding that a particular bearing, suspension part or motor must have failed.',
        ],
        table: {
          caption: 'The history that changes a washer vibration request',
          headings: ['When it happens', 'Useful context', 'Before another cycle'],
          rows: [
            [
              'First use after installation or a move',
              'Who installed it and whether setup was completed',
              'Ask the installer to review the setup; do not move or dismantle it',
            ],
            [
              'Only with a particular bulky item',
              'Item type, cycle and load instructions',
              'Review the manual once the appliance is safely stopped',
            ],
            [
              'Now with ordinary loads',
              'When the change began and any new noise',
              'Discuss an assessment instead of repeating high-speed cycles',
            ],
            [
              'With a leak or visible movement',
              'Where water appears and what the cabinet does',
              'Leave it stopped and report the additional concern',
            ],
          ],
        },
      },
      {
        heading: 'For a newly installed washer, start with installation history',
        paragraphs: [
          'Samsung and Whirlpool identify installation and loading as possible contributors to vibration. A front-loading washer that shakes from its first use has a different history from one that worked quietly for years. Mention whether it was just delivered, moved to another floor, placed on a pedestal or installed as part of stacked laundry.',
          'Transport restraints and leveling arrangements are model-specific. Ask the installer to confirm that the setup was completed according to the installation instructions. Do not slide a heavy machine out, unstack equipment or start removing bolts based on a generic picture. A clear description and an exterior installation photo can begin the conversation without risking the appliance or its connections.',
        ],
      },
      {
        heading: 'Load history matters, but it should not become endless trial and error',
        paragraphs: [
          'A bulky item or laundry collected on one side can be relevant to an imbalance concern. Review the model’s load and cycle guidance once the appliance has stopped safely and permits normal access. Do not force a locked door or reach into moving laundry. If an ordinary user adjustment is appropriate, follow the manual rather than improvising an overloaded or nearly empty test.',
          'If the problem now happens with the normal loads that previously worked, say that clearly. Repeated shaking after routine checks is a reason to discuss an assessment, not to keep experimenting at maximum spin speed. Note what you already changed so the next conversation does not simply send you through the same cycle again.',
        ],
      },
      {
        heading: 'Describe noise, remaining water and spin behavior separately',
        paragraphs: [
          'Banging, a growing rumble and a brief sound as a cycle changes are different descriptions. A recording from a safe position during a previous normal attempt may be useful, but do not restart a violently moving machine just to capture one. Explain whether it reaches full spin, stops before spin or leaves the load unusually wet.',
          'Standing water is another separate observation. If water remains in the drum, include that detail instead of reporting only the shaking. If the appliance leaks, leave it stopped and describe where water appeared. Several symptoms can occur together; they should not be turned into a remote diagnosis from a sound or error code alone.',
        ],
        links: [
          { label: 'If water remains in the washer', href: '/blog/washer-not-draining/' },
          {
            label: 'If the washer never reaches the spin stage',
            href: '/blog/washer-not-spinning-philadelphia/',
          },
          {
            label: 'If the washer is also leaking',
            href: '/blog/washer-leaking-water-philadelphia/',
          },
        ],
      },
      {
        heading: 'Floor and access information help plan the right visit',
        paragraphs: [
          'Mention an upstairs laundry room, a closet, a pedestal or stacked equipment. If a floor has visibly changed or been damaged, do not assume an appliance repair alone will resolve the situation. Share the concern before booking so the kind of assessment and access can be discussed realistically. No one needs you to prove the floor’s condition by running another unstable load.',
          'Keep the model information and a photo of the full arrangement if safely accessible. Clear ordinary belongings from the access path while leaving feet, shims, stacking brackets and connections alone. For a rental, confirm who can authorize work and provide access. Preparation should make the appointment easier, not create a second repair problem.',
        ],
        links: [
          {
            label: 'Prepare for a residential appliance visit',
            href: '/blog/appliance-repair-visit-checklist/',
          },
        ],
      },
      {
        heading: 'Compare an assessed repair with the actual replacement situation',
        paragraphs: [
          'A shaking washer is not automatically worn out, and a very new one is not automatically free of a setup concern. Explain its approximate age, when the symptom began and any recent work. An assessment can distinguish the repair question from the installation context before you buy parts or plan to replace the machine.',
          'For a stacked or built-in arrangement, replacement can involve fit and other equipment as well as a new appliance. The initial call to 5VA is free and carries no obligation to book. Visit and diagnostic charges are separate; a repair price follows on-site inspection. Review proposed work before authorizing it. We do not sell replacement washers or retail parts.',
        ],
        links: [
          { label: 'See household washing machine repair', href: '/services/washer-repair/' },
          {
            label: 'Consider repair versus replacement',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Request washer repair in the covered Philadelphia area',
        paragraphs: [
          'A concise request could be: “Front-loading household washer in 19115. It previously worked normally but now bangs and moves on spin with ordinary loads. We stopped it; here is the model and laundry-room photo.” Add any code, leak or recent installation change. We confirm suitability, the exact address and an appointment before the visit.',
          'Call or text +1 (267) 704-8588 every day, 7am–8pm. Home visits cover Philadelphia 19115 and 19116, all Montgomery County, PA, and the listed nearby PA and NJ ZIP codes. Commercial laundromat equipment and customer drop-off are outside our service. You do not need to dismantle the washer or identify a failed part before asking about repair.',
        ],
        links: [{ label: 'Check the confirmed PA and NJ service area', href: '/service-areas/' }],
      },
    ],
    faqs: [
      {
        q: 'Is a washer that moves across the floor normal?',
        a: 'Do not keep using a violently moving washer. Stop it safely and report the movement, load and installation history. Do not hold it in place or repeatedly run high-speed cycles.',
      },
      {
        q: 'What if shaking began on the first use after delivery?',
        a: 'Tell the installer and ask for the model-specific setup to be reviewed. Leave heavy equipment, transport restraints and connections alone rather than following generic removal instructions.',
      },
      {
        q: 'Does shaking always mean worn bearings?',
        a: 'No. The load, installation and appliance condition can produce different concerns. A component recommendation requires assessment; a noise description alone does not establish the cause.',
      },
    ],
    sources: [
      {
        title: 'Samsung: washing machine shaking concerns',
        url: 'https://www.samsung.com/us/support/troubleshoot/TSG10007111/',
      },
      {
        title: 'Whirlpool: front-load washer walking or vibrating',
        url: 'https://producthelp.whirlpool.com/Laundry/Washers/Front_Load_Washers/Not_Starting_or_Not_Operating/Vibration/Washer_Walking_and%2F%2For_Vibrating_-_Front_Load_Washer',
      },
    ],
  },
];
