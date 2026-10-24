import { articles as existingArticles, services } from './content.ts';
import { localGuides } from './local-guides.ts';
export interface JournalArticle {
  slug: string;
  title: string;
  seoTitle: string;
  category: string;
  description: string;
  sections: { heading: string; paragraphs: string[] }[];
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
const inputs = [
  ...localGuides,
  ...existingArticles.map((article) => ({ ...article, ...metadata[article.slug], faqs: [] })),
];
export const articles: JournalArticle[] = inputs.map((article) => {
  const words = [
    article.title,
    article.description,
    article.takeaway,
    ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
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
