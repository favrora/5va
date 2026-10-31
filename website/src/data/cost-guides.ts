import type { JournalArticle } from './journal.ts';

type Guide = Omit<
  JournalArticle,
  'seoTitle' | 'wordCount' | 'readTime' | 'icon' | 'group' | 'image' | 'imageAlt'
>;

export const costGuides: Guide[] = [
  {
    slug: 'refrigerator-repair-cost',
    title: 'Refrigerator Repair Cost: What Are You Actually Paying For?',
    category: 'Kitchen care',
    description:
      'Compare published US refrigerator repair costs, understand a complete estimate, and decide when to arrange an at-home assessment in the Philadelphia area.',
    primaryKeyword: 'refrigerator repair cost',
    relatedServices: ['refrigerator-repair', 'freezer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'Published US guides put many refrigerator repairs in the low hundreds of dollars, but the fault and model determine the work. A useful quote separates diagnosis, parts, labor and any remaining charges. 5VA gives the repair price after an on-site inspection; national figures below are context, not our rates.',
    sections: [
      {
        heading: 'How much does refrigerator repair cost?',
        paragraphs: [
          'HomeGuide publishes a national refrigerator repair range of $125–$500. Angi’s guide, updated October 15, 2026, gives $150–$400. These are different publishers’ broad estimates, checked October 31, 2026, rather than a Philadelphia price survey. They describe a mix of jobs and cannot establish what your refrigerator needs. A local proposal may fall outside either range.',
          'Use a national range to prepare questions, not to choose a part. A door-sealing problem, a failed control and a cooling-system repair are different scopes. The price of a replacement component in an online shop is also different from the cost of diagnosing, supplying, fitting and checking it. Before comparing two numbers, find out what each number includes.',
        ],
        table: {
          caption: 'Published US context, not a 5VA price list',
          headings: ['Reference', 'Published repair range', 'How to use it'],
          rows: [
            ['HomeGuide refrigerator guide', '$125–$500', 'Broad national planning context'],
            ['Angi refrigerator guide', '$150–$400', 'Another publisher’s national estimate'],
            [
              'Your refrigerator',
              'Determined after inspection',
              'Use the diagnosis and complete proposed work',
            ],
          ],
        },
      },
      {
        heading: 'Match the estimate to the actual symptom',
        paragraphs: [
          'Start with what happened during normal use: both compartments warm, refrigerator warm while the freezer still freezes, water on the floor, or a door that does not close normally. Include when the change began and whether food temperatures were measured. A display setting is not necessarily the actual temperature inside the cabinet.',
          'Whirlpool lists several possible explanations for poor cooling, including normal settings, blocked airflow and faults in internal components. That is why “not cooling” is not a compressor diagnosis. Likewise, a leak does not identify a water valve by itself. Paying for a guessed part can leave you with the same symptom and another repair decision.',
          'You can check accessible controls, door closure and the model’s normal operating instructions without dismantling anything. Keep covers and connections intact. Do not move a heavy refrigerator just to find a rear label, touch hot equipment or repeat electrical resets. Share accessible model information and observations instead.',
        ],
        links: [
          {
            label: 'Read the refrigerator-not-cooling checklist',
            href: '/blog/refrigerator-not-cooling/',
          },
          {
            label: 'Separate refrigerator leak symptoms',
            href: '/blog/refrigerator-leaking-water/',
          },
        ],
      },
      {
        heading: 'Read the complete refrigerator repair estimate',
        paragraphs: [
          'Ask what the inspection establishes and what the proposed repair will address. A clear explanation should connect the diagnosed fault with the work being recommended. “Replace a board” is less useful than an explanation of why that board is the issue, what is included in fitting it and how the original complaint will be checked afterward.',
          'Clarify the financial steps before authorizing work: any visit or diagnostic charge, the proposed repair amount, how an already-paid charge is treated, and whether anything remains outside the total. Ask about applicable tax, additional visits and part ordering rather than assuming they are included. 5VA’s initial conversation is free; that does not make the home visit, diagnosis or repair free.',
          'If a second fault is discovered, ask for an explanation and a revised proposal before additional work. Keep the model, initial diagnosis and approved scope together. This is more useful than comparing hourly rates without knowing the work, or assuming the lowest component price represents the lowest completed repair cost.',
        ],
      },
      {
        heading: 'Understand what can change the price',
        paragraphs: [
          'The exact model affects which parts fit and whether a component is available separately or as part of an assembly. Two refrigerators with similar doors and the same brand name can use different parts. Supply timing matters too: ask whether the necessary item is available and whether a return visit is expected. Availability is not a promise of same-day completion.',
          'Installation changes access. A freestanding kitchen refrigerator, a cabinet-depth model and a built-in installation may require different planning. Explain tight clearances, stairs or a difficult route before the visit. Do not disconnect a water line or remove cabinetry to prepare. Discuss access so the service request accurately describes the work.',
          'A confirmed sealed-system problem deserves its own comparison. It is a different category from an accessible control or seal repair, and a compressor part price alone does not describe the installed job. If that is the actual diagnosis, use the separate compressor guide to review the scope without assuming every cooling complaint belongs in that category.',
        ],
        links: [
          {
            label: 'Compare refrigerator compressor replacement costs',
            href: '/blog/refrigerator-compressor-replacement-cost/',
          },
        ],
      },
      {
        heading: 'Repair or replace: compare the cost of returning the kitchen to use',
        paragraphs: [
          'Compare the proposed repair with a replacement that actually fits your space and needs. A store’s appliance price may leave out delivery, installation, removal and changes around the opening or water connection. Obtain those amounts from the relevant providers. An inexpensive refrigerator that cannot fit through the doorway is not an equivalent replacement option.',
          'Here is an arithmetic example, not a customer job or a 5VA quote: a $350 repair proposal compared with a $1,200 complete replacement is about 29% of that replacement cost. The ratio is a discussion aid. It does not prove that repair is best; the existing refrigerator’s condition, repair history, available parts and your plans still matter.',
          'A single isolated fault in an otherwise useful appliance is a different decision from several unresolved problems. Describe previous repairs, recurring temperature changes, damaged shelving or doors, and anything else that affects continued use. Ask what the proposed repair will resolve and what it will leave unchanged. There is no reliable universal age or percentage that decides every case.',
        ],
        links: [
          {
            label: 'Use the broader repair-or-replace framework',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Check existing coverage before paying for work',
        paragraphs: [
          'Find the purchase receipt, model, serial number and any manufacturer or service-plan documents you already have. Ask the issuer whether the particular failure is covered, whether labor and diagnosis are included, and whether its authorization is needed before an outside visit. A covered component does not automatically mean a completely free repair.',
          'Do not assume that every local repair provider can perform warranty work for the manufacturer. 5VA does not claim manufacturer authorization or a particular warranty term here. If you arrange an independent assessment, explain any existing claim or prior diagnosis so that the proposed visit does not conflict with the process your coverage requires.',
        ],
      },
      {
        heading: 'Protect food while you decide',
        paragraphs: [
          'The FDA recommends keeping a refrigerator at 40°F or below and a freezer at 0°F. Use an appliance thermometer when available; the light coming on is not evidence that food is being kept cold. Minimize unnecessary door opening and move perishables to reliable cold storage when cooling has failed.',
          'Food safety depends on the food, temperature and time involved. Consult the FDA’s specific guidance rather than tasting food or waiting for a repair appointment to decide whether it is safe. Tell the service provider when cooling changed, but treat immediate food-storage decisions separately from the repair estimate.',
        ],
      },
      {
        heading: 'Arrange a refrigerator assessment in the Philadelphia area',
        paragraphs: [
          'Call or text +1 (267) 704-8588 every day, 7am–8pm, with the symptom, accessible model information and ZIP code. 5VA provides at-home residential appliance repair in Philadelphia ZIPs 19115 and 19116, all Montgomery County, PA, and the other specifically listed Pennsylvania and New Jersey ZIPs. Confirm your address and appointment before planning around a visit.',
          'We repair household appliances; we do not sell refrigerators or retail parts, repair commercial equipment or accept customer drop-offs. The initial call is free with no obligation to book. The repair price is determined after an on-site inspection, so the conversation can start with your actual refrigerator rather than a promise based on a national average.',
        ],
        links: [
          { label: 'See residential refrigerator repair', href: '/services/refrigerator-repair/' },
          { label: 'Check the exact service territory', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a refrigerator repair estimate the same as a diagnostic fee?',
        a: 'Not necessarily. Ask what the visit or diagnosis costs, what the proposed repair includes and whether an earlier charge is credited. The initial 5VA phone conversation is free; on-site work is separate.',
      },
      {
        q: 'Does a warm refrigerator always need a compressor?',
        a: 'No. Several cooling and control problems can look similar. Describe both compartments and arrange an assessment before deciding on a component.',
      },
      {
        q: 'Can I compare a part price with the whole repair bill?',
        a: 'A part-only price excludes some or all of diagnosis, supply, fitting and checks. Compare the complete approved work with another complete option.',
      },
      {
        q: 'Can you give a fixed refrigerator repair price before visiting?',
        a: '5VA determines the repair price after an on-site inspection. Share the model, symptom and ZIP code to discuss an appropriate visit.',
      },
    ],
    sources: [
      {
        title: 'HomeGuide: national refrigerator repair cost context',
        url: 'https://homeguide.com/costs/refrigerator-repair-cost',
      },
      {
        title: 'Angi: refrigerator repair cost guide, updated October 15, 2026',
        url: 'https://www.angi.com/articles/how-much-does-refrigerator-repair-cost.htm',
      },
      {
        title: 'Whirlpool: possible reasons a refrigerator is not cooling',
        url: 'https://www.whirlpool.com/blog/kitchen/why-is-my-refrigerator-not-cooling.html',
      },
      {
        title: 'FDA: refrigerator temperatures and food safety',
        url: 'https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety',
      },
    ],
  },
  {
    slug: 'washing-machine-repair-cost',
    title: 'Washing Machine Repair Cost: Compare the Full Job',
    category: 'Laundry care',
    description:
      'Understand washing machine repair costs, pump versus drum decisions, stacked-unit access and the questions to ask before approving a washer repair.',
    primaryKeyword: 'washing machine repair cost',
    relatedServices: ['washer-repair', 'dryer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'A washer symptom is not a parts list. Compare the complete assessed repair, the machine’s condition and the installed replacement option. Published national costs help frame the discussion; 5VA’s price follows an on-site inspection.',
    sections: [
      {
        heading: 'What is the average washing machine repair cost?',
        paragraphs: [
          'HomeGuide lists a broad US washer repair range of $100–$400. Angi’s September 29, 2026 guide describes $180–$250 as its typical national range. Both were checked October 31, 2026. Their different figures reflect different published estimates, not a guaranteed price in your neighborhood and not a price list for 5VA.',
          'A small accessible fault and a major tub-related job belong to different decisions. A meaningful estimate names the diagnosed problem and explains the proposed work. Avoid deciding that an entire washer must be replaced because an online guide lists an expensive drum repair, or assuming a cheap pump will solve every draining complaint.',
        ],
        table: {
          caption: 'National washer estimates and their limits',
          headings: ['Published reference', 'US planning range', 'Not established by that number'],
          rows: [
            ['HomeGuide washer repair', '$100–$400', 'The fault in your particular washer'],
            ['Angi washer repair', '$180–$250', 'Your local complete repair charge'],
            [
              'An assessed 5VA repair',
              'Price after on-site inspection',
              'A fixed price before the machine is examined',
            ],
          ],
        },
      },
      {
        heading: 'Describe the stage where the washer stops',
        paragraphs: [
          'A washing machine that will not fill needs a different starting conversation from one that washes but leaves water in the drum. Note the last completed stage: filling, washing, draining or spinning. Say whether clothes are wet with an empty drum or submerged in standing water. Include the exact displayed error and when it appeared.',
          'A useful description might be: “It fills and washes, then stops with water still visible before the spin; the display shows this code.” That is a description you can give from normal use, not a diagnosis. Do not run repeated cycles just to collect evidence, force a locked door or remove a filter that your model does not identify as safely user-serviceable.',
          'Tell us whether there was a recent move, installation, unusually large load or interruption to water or power. Those details may change what needs investigating. A fault history helps the assessment more than a list of parts selected from another washer’s repair video.',
        ],
        links: [
          { label: 'Washer holds water: what to record', href: '/blog/washer-not-draining/' },
          {
            label: 'Wet clothes after a failed spin',
            href: '/blog/washer-not-spinning-philadelphia/',
          },
        ],
      },
      {
        heading: 'Why a drain-pump quote differs from a drum repair',
        paragraphs: [
          'The work depends on the confirmed fault and how the model is assembled. A replacement component may be available individually, or the repair may require a larger assembly. The time needed to reach and refit it can differ substantially. Ask for the model-specific scope rather than choosing whichever generic part price looks lowest.',
          'For context, HomeGuide publishes $150–$350 for a drain-pump replacement and $350–$800 for drum replacement. These are national examples of different scopes, not a diagnosis or an offer. A washer that will not drain does not automatically need the first repair, and a noisy washer does not automatically need the second.',
          'If the proposed work involves the tub, bearings or a major assembly, ask about the condition of related components and what the inspection found. For a pump-related proposal, ask whether the underlying obstruction or other cause has been addressed. The point is to understand the repair, not to request unnecessary replacement of neighboring parts.',
        ],
      },
      {
        heading: 'Top-load, front-load and stacked access change the planning',
        paragraphs: [
          'Tell the repair provider whether the appliance is top-loading, front-loading, a stacked pair or a combined washer-dryer. Provide the exact model when it is safely accessible. A combined appliance is not necessarily serviced in the same way as two separate machines, and stacked access may require planning before any work can be agreed.',
          'Describe a closet, narrow doorway, basement staircase, pedestal or cabinetry around the washer. Leave the machine installed; do not unstack equipment or disconnect hoses yourself to prepare. The provider needs to discuss safe access and suitability. A neat close-up of an error code is useful, but a wider installation photo can answer a different set of questions.',
          'If you rent, establish who authorizes the visit and proposed work. If several people manage the property, agree who can make the decision during the appointment. These details prevent a price discussion from stalling because the appliance or decision-maker is not accessible.',
        ],
      },
      {
        heading: 'Use a short checklist before approving washer repair',
        paragraphs: [
          'Ask for the diagnosis, proposed component or work, complete charge and any exclusions. Clarify how a diagnostic charge is treated if you approve or decline. Ask whether a part must be ordered, whether a second visit is expected and how any changed scope will be approved. A verbal promise that something is “probably cheap” is not the same as an assessed repair proposal.',
          'Also distinguish the appliance from the home’s water, drain and electrical systems. If an external connection needs another trade, that is a separate scope to understand, not an automatic part of a washing-machine repair. Do not assume that a washer estimate includes repairing flooring or damage caused by a leak.',
        ],
        table: {
          caption: 'Questions that make two washer proposals comparable',
          headings: ['Ask about', 'Useful answer', 'Why it matters'],
          rows: [
            [
              'Diagnosis',
              'What failed and what evidence supports it',
              'A symptom alone does not identify a part',
            ],
            [
              'Total',
              'What parts, labor and visit charges are included',
              'A low part price may exclude the job',
            ],
            [
              'Access',
              'How the installed machine will be reached',
              'Stacking and tight closets affect planning',
            ],
            [
              'Completion',
              'Part availability and expected visits',
              'An ordered item changes the timetable',
            ],
          ],
        },
      },
      {
        heading: 'Decide whether the washer is worth repairing',
        paragraphs: [
          'Compare the assessed repair with the complete cost of a suitable replacement. Include delivery, connection, removal and any stacking compatibility requirements in that replacement comparison. Do not assume the current dryer can safely stack on an arbitrary new washer; check the manufacturers’ actual installation requirements.',
          'For an illustration only, a $300 repair versus a $1,000 complete replacement is 30%. That calculation does not predict remaining life or establish a rule. A washer with a single fault and a good history is different from one with repeated leaks, other unresolved damage and a major new failure. Money spent on an old repair is already spent; compare the options you actually have now.',
          'Review any existing manufacturer coverage before authorizing outside work. Confirm who must approve a claim and what charges remain yours. Neither a manufacturer’s component warranty nor a national cost article guarantees free local labor. Keep the paperwork and the current proposal together so that the decision uses the correct model and scope.',
        ],
        links: [
          {
            label: 'Compare repair and replacement systematically',
            href: '/blog/appliance-repair-or-replace/',
          },
          { label: 'Budget a separate dryer problem', href: '/blog/dryer-repair-cost/' },
        ],
      },
      {
        heading: 'Stop a leak from becoming a larger problem',
        paragraphs: [
          'If the washer is leaking, leave it stopped and keep people away from wet electrical equipment. Follow only the safe normal shutdown instructions for your model and situation. Do not reach through water to unplug equipment, force a valve or pull out a heavy machine to investigate. An immediate electrical or flooding hazard needs appropriate urgent help.',
          'Record where water first appeared, the cycle stage and any existing photo taken safely. Do not repeatedly wash a small load to see whether the leak returns. Damage to the room can become a separate expense from the washer repair; avoiding further use while arranging an assessment is often more useful than trying to predict a component price.',
        ],
        links: [
          {
            label: 'Prepare a clear washer-leak description',
            href: '/blog/washer-leaking-water-philadelphia/',
          },
        ],
      },
      {
        heading: 'Request an at-home washer assessment',
        paragraphs: [
          'Contact 5VA at +1 (267) 704-8588 by call or SMS every day, 7am–8pm. Share the model, symptom, installation and ZIP code. Home visits cover Philadelphia 19115 and 19116, all Montgomery County, PA, and the listed nearby Pennsylvania and New Jersey ZIPs. Confirm coverage and the appointment before making arrangements.',
          'The initial conversation is free with no obligation to book; visit and repair charges are separate, and the repair price follows an on-site inspection. Residential household machines only: no commercial laundry equipment, appliance sales, retail parts sales or drop-off service.',
        ],
        links: [
          { label: 'See household washing machine repair', href: '/services/washer-repair/' },
          { label: 'Confirm the exact service area', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it worth repairing a washing machine?',
        a: 'Compare the complete assessed repair with a suitable installed replacement, the washer’s current condition and its history. Age or a single percentage cannot decide every case.',
      },
      {
        q: 'Does a washer that will not drain need a new pump?',
        a: 'Not automatically. Describe standing water, cycle behavior and any error code; the assessment determines the actual fault.',
      },
      {
        q: 'Why is a stacked washer repair different?',
        a: 'Access and safe handling need planning. Share the model and installation; do not unstack the appliances before the visit.',
      },
      {
        q: 'Are these published prices what 5VA charges?',
        a: 'No. They are attributed national planning figures. 5VA determines the repair price after an on-site inspection, with the initial call free.',
      },
    ],
    sources: [
      {
        title: 'HomeGuide: national washing machine repair costs',
        url: 'https://homeguide.com/costs/washing-machine-repair-cost',
      },
      {
        title: 'Angi: washing machine repair guide, updated September 29, 2026',
        url: 'https://www.angi.com/articles/how-much-washing-machine-repair-costs.htm',
      },
      {
        title: 'Whirlpool: front-load washer spin concerns',
        url: 'https://producthelp.whirlpool.com/Laundry/Washers/Front_Load_Washers/Cycle_Concerns/Not_Turning%2C_Tumbling%2C_or_Spinning/Not_Spinning_-_Front_Load_Washer',
      },
    ],
  },
  {
    slug: 'dryer-repair-cost',
    title: 'Dryer Repair Cost: Parts, Labor and the Repair Decision',
    category: 'Laundry care',
    description:
      'Compare published dryer repair costs, distinguish vented and heat-pump models, and understand the estimate before booking residential dryer service.',
    primaryKeyword: 'dryer repair cost',
    relatedServices: ['dryer-repair', 'washer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'A dryer repair bill should explain the diagnosed fault, the complete proposed work and any separate airflow or installation issue. National price guides are a starting reference, not a local quote. 5VA determines the repair price after an on-site inspection.',
    sections: [
      {
        heading: 'How much does dryer repair cost?',
        paragraphs: [
          'HomeGuide gives a national dryer repair range of $100–$300. Angi’s guide, updated September 18, 2026, describes most homeowners paying $100–$430. These published estimates were checked October 31, 2026. They cover different mixes of work and are not 5VA prices or a guarantee for a Philadelphia-area appliance.',
          'The useful question is what it costs to resolve the diagnosed problem in your installed dryer. A belt, a motor and an electronic control are different scopes. A cheap part advertised online excludes some or all of finding the fault, supplying the correct component, reaching it, fitting it and checking operation. Compare full proposals rather than isolated part prices.',
        ],
        table: {
          caption: 'National dryer cost references, not a local price list',
          headings: ['Reference', 'Published US range', 'What still needs assessment'],
          rows: [
            ['HomeGuide dryer repair', '$100–$300', 'The actual fault and installed model'],
            ['Angi dryer repair', '$100–$430', 'The complete local scope and charge'],
            [
              'A 5VA service request',
              'Repair price after inspection',
              'Suitability, access and proposed work',
            ],
          ],
        },
      },
      {
        heading: 'Identify the dryer type before comparing prices',
        paragraphs: [
          'Tell the provider whether you have a gas dryer, a conventional electric vented dryer, a condenser dryer or a heat-pump model. If you are unsure, share the safely accessible model number instead of moving equipment or inspecting connections. A visible control panel alone may not identify the heating arrangement.',
          'A ventless appliance has a different moisture-handling arrangement from one connected to an exhaust duct. Price tables for conventional heating elements do not automatically apply to a heat-pump dryer. The exact model also matters for parts, normal user maintenance and installation requirements. Discuss the appliance before assuming a common repair category fits it.',
          'Stacked laundry and a combined washer-dryer need an installation description too. Include closet access, stairs and anything restricting the work area. Do not unstack the equipment, disconnect a gas line or pull a heavy dryer out to prepare for an appointment.',
        ],
      },
      {
        heading: 'Separate no heat, no tumble and slow drying',
        paragraphs: [
          'Describe what you observed during ordinary use. Did the drum turn without useful heat? Did the controls light up without the cycle starting? Were clothes warm but still damp after longer than usual? Did the dryer stop early or make a new sound? Those descriptions help define the assessment; they do not identify a particular part.',
          'Airflow can matter on a vented dryer. The NFPA recommends cleaning the lint filter before or after each load and having restricted venting addressed. A long drying time is therefore not automatically proof that the appliance needs a heating element. Tell the provider about any accessible filter maintenance and known exhaust concerns without dismantling ducts or recreating an overheating condition.',
          'Do not bypass a thermal safety device, hold a door switch closed or continue using a dryer with smoke, a burning smell or an unusually hot condition. If gas is suspected, leave the area and contact the gas emergency service from a safe place. Immediate hazards are separate from the normal repair-booking process.',
        ],
        links: [
          {
            label: 'Prepare a dryer-not-heating description',
            href: '/blog/dryer-not-heating-philadelphia/',
          },
        ],
      },
      {
        heading: 'Read component prices without diagnosing from them',
        paragraphs: [
          'HomeGuide’s national examples include $100–$250 for belt replacement and $150–$350 for heating-element replacement. Those are published installed-job examples, not prices for every dryer and not a reason to buy either part. Gas and heat-pump models do not simply use the same conventional electric heating-element repair.',
          'When a provider recommends a component, ask what the inspection established and whether another condition contributed to the failure. If airflow is involved, find out whether that work is included, requires a separate provider or remains outside the proposed repair. Replacing a component without understanding the rest of the scope may leave the original complaint unresolved.',
          'Ask whether the component is available and whether it is supplied individually or as an assembly. A return visit, difficult access or a different model-specific component can change the proposal. Discuss those facts before comparing a national average with a complete local job.',
        ],
      },
      {
        heading: 'What should the dryer estimate include?',
        paragraphs: [
          'Confirm any visit or diagnostic charge before the appointment. After inspection, review the diagnosed fault, proposed parts and labor, total charge, exclusions and how any already-paid amount is treated. Ask whether further work requires your approval and whether an ordered component changes the number of visits.',
          'Keep appliance repair separate from unrelated building work. An estimate for the dryer does not automatically include changes to the home’s wiring, gas supply, wall opening or exhaust route. If something outside the appliance needs attention, ask for a clear explanation and an appropriate next step rather than assuming it has been included.',
          'A promised completion date should follow actual parts and scheduling information. There is no guaranteed same-day repair stated here. Also ask about the terms attached to the proposed work; do not infer a particular warranty from an online article or a manufacturer name printed on the dryer.',
        ],
        table: {
          caption: 'Keep these dryer repair scopes separate',
          headings: ['Scope', 'Clarify before approval', 'Avoid assuming'],
          rows: [
            [
              'Appliance diagnosis and repair',
              'Fault, component, labor and checks',
              'That one symptom names one part',
            ],
            [
              'Exhaust or installation issue',
              'Whether included or separate',
              'That every duct or building issue is appliance work',
            ],
            [
              'Ordered part or return visit',
              'Availability and what the total covers',
              'That a first visit guarantees completion',
            ],
          ],
        },
      },
      {
        heading: 'Is fixing the dryer better than replacing it?',
        paragraphs: [
          'Compare the assessed repair with a replacement that suits the existing fuel type, electrical supply, space and installation. Include delivery, connection, removal and any stacking requirements when obtaining the replacement total. Changing dryer technology may also change installation requirements, so the appliance’s shelf price alone is an incomplete comparison.',
          'As a simple illustration, a $250 repair compared with an $850 fully installed replacement is about 29%. These hypothetical amounts are not a customer example or 5VA rates. The ratio helps organize the discussion; the condition of the drum, controls, cabinet, installation and any prior problems still matters.',
          'If the dryer otherwise meets your needs and has one confirmed repairable fault, repair may deserve consideration. If the quote leaves other major problems unresolved, include those in the decision. A matching laundry pair does not automatically require replacing both appliances; check actual stacking and installation compatibility before deciding.',
        ],
        links: [
          {
            label: 'Compare repair and replacement options',
            href: '/blog/appliance-repair-or-replace/',
          },
          {
            label: 'Read the separate washer cost guide',
            href: '/blog/washing-machine-repair-cost/',
          },
        ],
      },
      {
        heading: 'Prepare a useful residential dryer service request',
        paragraphs: [
          'Keep the model number, symptom, last normal use, error message and installation details together. If the dryer stops at a particular stage, describe the stage rather than running another cycle to time it. Photograph accessible controls only from a safe position. This helps the conversation focus on the actual complaint.',
          'Call or SMS +1 (267) 704-8588 every day, 7am–8pm. 5VA makes home visits in Philadelphia ZIPs 19115 and 19116, all Montgomery County, PA, and the other listed PA and NJ ZIPs. Confirm your address, appliance and appointment before making plans. The initial call is free with no obligation; the inspection and repair are charged separately, and price follows the on-site assessment.',
          'Service is for household residential appliances only. We do not repair commercial laundry equipment, sell appliances or retail parts, or accept customer drop-offs. If your issue concerns a laundromat or another commercial installation, this is not the appropriate service request.',
        ],
        links: [
          { label: 'See at-home dryer repair', href: '/services/dryer-repair/' },
          { label: 'Check the complete service territory', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a dryer heating element always the cause of no heat?',
        a: 'No. The appliance type and actual diagnosis matter. Gas, conventional electric and heat-pump dryers do not share one universal no-heat repair.',
      },
      {
        q: 'Does a dryer repair quote include vent work?',
        a: 'Ask explicitly. Appliance repair, exhaust cleaning and building or connection changes may be different scopes.',
      },
      {
        q: 'Should I replace both my washer and dryer?',
        a: 'One failed appliance does not automatically require replacing both. Check the condition of each and any stacking or installation compatibility requirements.',
      },
      {
        q: 'Can 5VA give the repair price from the symptom alone?',
        a: 'The repair price is determined after an on-site inspection. Call or text the model, symptom and ZIP code to discuss service.',
      },
    ],
    sources: [
      {
        title: 'HomeGuide: national dryer repair costs',
        url: 'https://homeguide.com/costs/dryer-repair-cost',
      },
      {
        title: 'Angi: dryer repair guide, updated September 18, 2026',
        url: 'https://www.angi.com/articles/dryer-repair-cost.htm',
      },
      {
        title: 'NFPA: clothes dryer safety',
        url: 'https://www.nfpa.org/-/media/project/storefront/catalog/files/safety-tip-sheets/dryersafetytips.pdf?rev=8af04b5662ec41ebaed95e6064888f71',
      },
    ],
  },
  {
    slug: 'dishwasher-repair-cost',
    title: 'Dishwasher Repair Cost: A Practical Repair-or-Replace Guide',
    category: 'Kitchen care',
    description:
      'Compare national dishwasher repair costs, clarify pump and motor estimates, account for installation, and plan an at-home repair assessment.',
    primaryKeyword: 'dishwasher repair cost',
    relatedServices: ['dishwasher-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'Compare the complete assessed repair with an installed replacement, not just a dishwasher’s retail price. Published national ranges are planning context; 5VA determines the actual repair price after an on-site inspection.',
    sections: [
      {
        heading: 'How much does dishwasher repair cost?',
        paragraphs: [
          'HomeGuide publishes a typical US dishwasher repair range of $100–$300. Angi’s guide, updated October 21, 2026, describes a typical national range of $175–$325 in its main cost discussion. These references were checked October 31, 2026. They are not Philadelphia-specific survey results, a quote for your appliance or 5VA rates.',
          'Published ranges differ because the work, model and scope differ. A door-related fault, a drain problem and a circulation-system repair are not interchangeable jobs. The assessment should establish the fault before the price discussion becomes a parts list. A low price for one replacement item does not include every step needed to get the dishwasher working.',
        ],
        table: {
          caption: 'Published dishwasher repair context',
          headings: ['Reference', 'National planning range', 'Important limit'],
          rows: [
            ['HomeGuide dishwasher repair', '$100–$300', 'A broad mix of US jobs'],
            ['Angi typical repair discussion', '$175–$325', 'Not a model-specific local quote'],
            ['Your complete proposal', 'Price after inspection', 'Check exactly what is included'],
          ],
        },
      },
      {
        heading: 'Drain pump and wash circulation are different questions',
        paragraphs: [
          'A dishwasher needs to move water during washing and remove it afterward. Describe whether the complaint is standing water, dishes coming out dirty, a cycle that never begins, or water escaping onto the floor. Those observations can overlap, but they do not establish that a particular pump or motor has failed.',
          'For scale, HomeGuide lists $100–$400 for drain-pump replacement and $350–$500 for a motor replacement. These are national installed-repair examples, not selectable repair packages. Model-specific assemblies and the confirmed fault determine what a local proposal should contain. Do not compare a small drain-pump part listing with a complete circulation-related job.',
          'Ask the provider to explain which function is failing, why the recommended work addresses it and what will be checked afterward. If the symptom remains intermittent, explain the pattern instead of selecting a component yourself. An exact error message, cycle stage and recent installation history are useful without opening the machine.',
        ],
        links: [
          {
            label: 'Record a dishwasher drainage problem clearly',
            href: '/blog/dishwasher-not-draining/',
          },
        ],
      },
      {
        heading: 'What changes the complete dishwasher repair bill?',
        paragraphs: [
          'The model determines component compatibility and whether the necessary item is sold individually or as an assembly. Availability and access affect planning too. A built-in, drawer-style, portable or countertop appliance can need different discussion before service is agreed. Give the exact model and installation rather than assuming every dishwasher is the same standard unit.',
          'Tell us if new flooring, cabinetry, a tight opening or a decorative panel restricts access. Do not remove mounting screws or pull the dishwasher out to prepare. Safely reaching a built-in machine is part of planning the job; it should not be guessed from a close-up of the control panel.',
          'Distinguish appliance work from the home’s drain, water supply and electrical connections. If another issue is discovered outside the dishwasher, ask whether it is included or requires a separate provider. An appliance repair proposal does not automatically include changes to cabinetry, flooring or building plumbing.',
        ],
      },
      {
        heading: 'Check these details before authorizing work',
        paragraphs: [
          'Clarify the visit or diagnostic charge before booking. After assessment, ask what the proposed total includes, whether an earlier charge is credited, whether a part must be ordered and how any additional work would be approved. A repair should be tied to a diagnosis, not an assumption that the most common part must be the problem.',
          'Ask how completion will be assessed for your original complaint. A dishwasher that drains but still leaks has not had both complaints resolved merely because one component changed. Explain every relevant symptom at the start so the scope can be discussed accurately, including any known problem that you do not want included in the present work.',
          'Keep any existing manufacturer coverage documents handy. Confirm its authorization requirements before paying for outside work and whether parts, labor or the diagnosis are actually covered. This guide does not claim 5VA is a manufacturer-authorized warranty provider or promise a particular repair guarantee.',
        ],
        table: {
          caption: 'A complete dishwasher estimate should answer these questions',
          headings: ['Question', 'What to clarify', 'Why it helps'],
          rows: [
            ['What failed?', 'Diagnosis and proposed work', 'Avoid paying for a guessed component'],
            [
              'What is the full charge?',
              'Parts, labor, diagnosis and exclusions',
              'Compare complete proposals',
            ],
            [
              'Can the machine be accessed?',
              'Opening, flooring and panel constraints',
              'Plan the actual installed job',
            ],
            [
              'What happens next?',
              'Ordering, visits and approval of changes',
              'Avoid assuming immediate completion',
            ],
          ],
        },
      },
      {
        heading: 'Is it worth repairing the dishwasher?',
        paragraphs: [
          'Compare the assessed repair with the full price of a replacement that fits the opening and your requirements. Obtain delivery, installation and removal costs as applicable. A quiet integrated dishwasher with a matching panel may have a different replacement comparison from a basic freestanding unit; neither should be compared with an unsuitable sale appliance.',
          'For a simple example only, a $280 repair versus a $1,000 complete replacement is 28%. These arithmetic amounts are not an actual customer case or 5VA charges. A percentage is one part of the decision. The condition of the tub, door, racks and controls, previous failures and any remaining concerns also matter.',
          'An isolated fault on an otherwise satisfactory machine can favor an assessment. Repeated failures or several expensive unresolved issues can change the comparison. Ask what the current repair will restore rather than treating a generic age limit as a guarantee of future reliability. No provider can infer every remaining problem from the dishwasher’s age alone.',
        ],
        links: [
          {
            label: 'Compare repair with a complete replacement',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Avoid spending money on a diagnosis by guesswork',
        paragraphs: [
          'If the issue is poor cleaning, first record the program, loading pattern and what changed. Consult the exact model’s ordinary loading and maintenance instructions. The filter may be user-serviceable on some models, but its design and removal method are not universal. Do not reach into broken glass or remove internal covers to investigate.',
          'For a leak or standing water, stop using the appliance while arranging an assessment. Do not keep running rinse cycles to find the lowest advertised repair price. Keep away from wet electrical areas, and seek appropriate urgent help for an immediate hazard. Damage to the room is a separate problem from the appliance repair itself.',
          'Do not buy a pump, control or seal in advance because another model had the same symptom. A part-only purchase can be incompatible or unrelated to the fault. 5VA provides residential repair service and does not sell retail spare parts or replacement dishwashers.',
        ],
      },
      {
        heading: 'Arrange household dishwasher repair near Philadelphia',
        paragraphs: [
          'Call or text +1 (267) 704-8588 every day, 7am–8pm, with the model, symptom and ZIP code. Include whether it is a built-in unit and any known access issue. The initial conversation is free with no obligation to book. Visit, diagnosis and repair charges are separate; the repair price follows an on-site inspection.',
          '5VA visits homes in Philadelphia ZIPs 19115 and 19116, all Montgomery County, PA, and the other specifically listed Pennsylvania and New Jersey ZIPs. Check the exact coverage and appointment before making arrangements. There is no customer drop-off address. Commercial kitchen equipment, appliance sales and retail parts sales are outside this service.',
        ],
        links: [
          { label: 'See residential dishwasher repair', href: '/services/dishwasher-repair/' },
          { label: 'Check home-visit coverage', href: '/service-areas/' },
          {
            label: 'Prepare for an appliance assessment',
            href: '/blog/appliance-repair-visit-checklist/',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does standing water mean I need a new dishwasher pump?',
        a: 'Not automatically. The symptom, installation and actual diagnosis determine the work. Describe the cycle stage and error message before choosing a component.',
      },
      {
        q: 'Is dishwasher replacement cheaper than repair?',
        a: 'Compare the assessed repair with a suitable replacement including installation, delivery and removal, then consider the existing dishwasher’s condition and history.',
      },
      {
        q: 'Do national cost ranges include my exact model?',
        a: 'They are broad estimates, not confirmation of your model, fault or local scope. 5VA’s repair price is established after an on-site inspection.',
      },
      {
        q: 'Should I pull the dishwasher out before the visit?',
        a: 'No. Leave it installed and explain any flooring, cabinet, mounting or access restriction when discussing the appointment.',
      },
    ],
    sources: [
      {
        title: 'HomeGuide: national dishwasher repair costs',
        url: 'https://homeguide.com/costs/dishwasher-repair-cost',
      },
      {
        title: 'Angi: dishwasher repair guide, updated October 21, 2026',
        url: 'https://www.angi.com/articles/how-much-do-dishwasher-repairs-cost.htm',
      },
    ],
  },
  {
    slug: 'refrigerator-compressor-replacement-cost',
    title: 'Refrigerator Compressor Replacement Cost: Is It Worth It?',
    category: 'Kitchen care',
    description:
      'Understand refrigerator compressor replacement cost, part-only versus installed prices, coverage questions and the diagnosis needed before a major cooling repair.',
    primaryKeyword: 'refrigerator compressor replacement cost',
    relatedServices: ['refrigerator-repair', 'freezer-repair'],
    publishedOn: '2026-10-31',
    takeaway:
      'A warm refrigerator or a clicking sound does not prove the compressor has failed. Confirm the diagnosis before comparing a complete sealed-system repair with replacement. A compressor part price alone is not the installed repair cost.',
    sections: [
      {
        heading: 'How much does refrigerator compressor replacement cost?',
        paragraphs: [
          'HomeGuide’s US compressor guide publishes an installed replacement range of $700–$1,250, with $200–$400 for the component alone and $500–$850 for labor. Its page is dated October 12, 2023; the figures were checked October 31, 2026. They are broad national reference figures, not freshly collected Philadelphia prices or a 5VA quote.',
          'The difference between a part and an installed repair is especially important here. A compressor works within the refrigerator’s sealed cooling circuit. Access, the actual fault, the model and any related work affect the proposal. A listing for a loose compressor cannot establish compatibility, the rest of the required work or whether replacing it will solve the complaint.',
        ],
        table: {
          caption: 'HomeGuide’s published national compressor figures',
          headings: ['Published scope', 'US reference range', 'What to check locally'],
          rows: [
            [
              'Compressor component only',
              '$200–$400',
              'Exact model compatibility and what is excluded',
            ],
            ['Labor', '$500–$850', 'Which work and service charges the proposal includes'],
            [
              'Installed replacement',
              '$700–$1,250',
              'Diagnosis, complete scope and any remaining charges',
            ],
          ],
        },
      },
      {
        heading: 'Confirm the fault before budgeting for a compressor',
        paragraphs: [
          'A refrigerator that is warm, runs unusually or makes a new clicking sound may need service, but none of those observations alone identifies the failed component. Whirlpool describes multiple possible cooling problems, including airflow, controls and internal components. A remote guess should not become an instruction to buy an expensive part.',
          'Give the assessor the whole history: whether both compartments changed, when the problem began, any accessible temperature readings, error messages and previous repairs. Distinguish the temperature shown on the control from a measured cabinet temperature. Do not pull the refrigerator apart or touch rear equipment to check whether it feels hot.',
          'If someone has already diagnosed a compressor fault, keep the written diagnosis and proposal. Ask whether other parts of the cooling circuit were considered and whether another confirmed fault remains. A second opinion is most useful when it reviews the same model and complaint, rather than comparing unrelated component prices.',
        ],
        links: [
          {
            label: 'Start with the general refrigerator cooling checklist',
            href: '/blog/refrigerator-not-cooling/',
          },
        ],
      },
      {
        heading: 'What belongs in a complete sealed-system proposal?',
        paragraphs: [
          'Ask what was diagnosed, which components are proposed and what work is needed to restore operation. Clarify how the proposed compressor relates to the model, whether there are other confirmed cooling-circuit problems and what checks will be used after the repair. The useful discussion is the complete scope, not just the name of one part.',
          'Request clarification of parts, labor, materials, diagnosis, applicable charges and any return visit. Find out whether the total changes if a further fault is found, and require an updated explanation before additional work is approved. A proposal that excludes an important known issue cannot be compared directly with one that includes it.',
          'Sealed-system work is not a household do-it-yourself project. Do not open refrigerant lines, attach charging equipment, replace electrical starting components or follow improvised compressor tests. Discuss the exact appliance and job suitability with the provider; this article does not promise that every sealed-system job or model can be accepted.',
        ],
        table: {
          caption: 'Questions for a major refrigerator cooling repair',
          headings: ['Ask', 'Why it matters', 'Useful record'],
          rows: [
            [
              'What confirms the compressor diagnosis?',
              'Several faults can cause poor cooling',
              'Written explanation tied to the model',
            ],
            [
              'Are other cooling-circuit faults present?',
              'Replacing one component may not be the full scope',
              'Included work and stated exclusions',
            ],
            [
              'What is the complete installed total?',
              'A part listing does not cover the job',
              'Parts, labor, charges and visit plan',
            ],
            [
              'What happens if the scope changes?',
              'Additional work should be discussed',
              'Your approval of a revised proposal',
            ],
          ],
        },
      },
      {
        heading: 'Check compressor coverage before approving independent work',
        paragraphs: [
          'Find the purchase receipt, serial number and warranty documents for the exact refrigerator. Some coverage treats a component differently from labor, diagnosis or other cooling-system work. Do not assume that a long component warranty makes the entire repair free. Ask the issuer which costs remain yours and how a claim must be authorized.',
          'If covered work must be arranged through a specified provider, resolve that before commissioning an independent repair. Keep the issuer’s instructions and reference information with the proposal. 5VA does not claim manufacturer authorization, free warranty labor or a universal compressor warranty in this guide.',
          'The same principle applies if a compressor was replaced previously. Review that actual invoice and its terms rather than assuming a new failure is covered or unrelated. Share the date, the parts listed and what changed afterward. A complete service history is more useful than an unsupported promise about remaining life.',
        ],
      },
      {
        heading: 'Is replacing the compressor worth the cost?',
        paragraphs: [
          'First compare like-for-like outcomes: a diagnosed repair of the existing refrigerator versus a complete replacement that fits the space and provides the functions you need. Include delivery, installation, removal and any opening or connection changes in the replacement figure. A built-in installation can create a different comparison from a basic freestanding refrigerator.',
          'Consider two arithmetic illustrations, not actual jobs or prices from 5VA. A $1,100 repair against a $1,300 complete replacement is about 85%; against a $3,000 replacement it is about 37%. The same hypothetical repair amount leads to a different comparison because the replacement option differs. Neither percentage predicts the repaired refrigerator’s remaining life.',
          'Then consider condition and uncertainty. Does the appliance have damaged doors, recurring leaks or other unresolved problems? Are the needed components available? Does the proposal address the full diagnosed fault? Is existing coverage relevant? Ask what a successful repair would restore and what would remain unchanged. A universal five-year or half-price rule cannot answer all of those questions.',
        ],
        links: [
          {
            label: 'Compare ordinary refrigerator repair costs',
            href: '/blog/refrigerator-repair-cost/',
          },
          {
            label: 'Review the full repair-or-replace decision',
            href: '/blog/appliance-repair-or-replace/',
          },
        ],
      },
      {
        heading: 'Plan for food storage and the actual appointment',
        paragraphs: [
          'A refrigerator that is not maintaining temperature creates an immediate food-storage problem independent of the repair price. The FDA recommends 40°F or below in the refrigerator and 0°F in the freezer. Follow its time-and-temperature guidance for the foods involved, and arrange reliable cold storage rather than assuming a future repair visit makes the current food safe.',
          'Ask about parts availability, the visit plan and any expected follow-up before scheduling around completion. A national guide’s labor estimate is not a promise that your repair will finish in that period. Do not load perishables back into a refrigerator merely because it has restarted; follow the provider’s advice and confirm appropriate storage temperatures.',
          'Keep the service area safely accessible, but leave the appliance, water connection, cabinetry and rear components in place. Explain stairs, a restricted opening or built-in access beforehand. Do not pull a large refrigerator across the floor to make an inspection easier.',
        ],
      },
      {
        heading: 'Discuss the refrigerator and service location with 5VA',
        paragraphs: [
          'Call or text +1 (267) 704-8588 every day, 7am–8pm. Share the symptom, model, any existing diagnosis and ZIP code. The initial conversation is free with no obligation. Confirm appliance and job suitability before booking; 5VA’s repair price follows an on-site inspection, with visit and repair charges separate from the free call.',
          'Home visits cover Philadelphia 19115 and 19116, all Montgomery County, PA, and the other listed Pennsylvania and New Jersey ZIPs. There is no customer drop-off location. We service residential household appliances, not commercial equipment, and do not sell refrigerators, compressors or other retail parts.',
        ],
        links: [
          {
            label: 'Discuss residential refrigerator repair',
            href: '/services/refrigerator-repair/',
          },
          { label: 'Check the confirmed home-visit territory', href: '/service-areas/' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a clicking refrigerator definitely a bad compressor?',
        a: 'No. A sound and a temperature complaint do not establish a component diagnosis. Record the behavior and arrange an assessment without opening the appliance.',
      },
      {
        q: 'Why does installation cost more than the compressor part?',
        a: 'A component listing is not the complete sealed-system job. Diagnosis, fitting, related work and checks must be understood in the actual proposal.',
      },
      {
        q: 'Does a compressor warranty cover labor?',
        a: 'Read the exact model’s coverage and ask the issuer. Component, labor and diagnostic coverage can differ, and authorization requirements may apply.',
      },
      {
        q: 'Can 5VA accept every compressor replacement?',
        a: 'Discuss the exact model, installation and existing diagnosis before booking. This guide does not guarantee suitability or a fixed repair price for every sealed-system job.',
      },
    ],
    sources: [
      {
        title: 'HomeGuide: refrigerator compressor cost, page dated October 12, 2023',
        url: 'https://homeguide.com/costs/refrigerator-compressor-cost',
      },
      {
        title: 'Whirlpool: possible causes of poor refrigerator cooling',
        url: 'https://www.whirlpool.com/blog/kitchen/why-is-my-refrigerator-not-cooling.html',
      },
      {
        title: 'FDA: refrigerator temperatures and food safety',
        url: 'https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety',
      },
    ],
  },
];
