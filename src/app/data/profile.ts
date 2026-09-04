/**
 * All page copy lives here. Edit this file to update the site — no markup changes needed.
 *
 * TODO(matt): items marked `REVIEW` below are carried over from the 2021 version and
 * may be out of date.
 */

export interface Degree {
  readonly credential: string;
  readonly graduated: string;
  readonly field: string;
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export interface Profile {
  readonly name: string;
  /** Shown under the name in the header. */
  readonly tagline: string;
  /** One paragraph, kept deliberately short. */
  readonly bio: readonly string[];
  readonly avatar: string;
  readonly avatarAlt: string;
  readonly resume: string;
  readonly education: readonly Degree[];
  readonly skills: readonly SkillGroup[];
  readonly links: {
    readonly github: string;
    readonly linkedin: string;
  };
  /** Split so the address is assembled at runtime and never sits in static HTML. */
  readonly email: { readonly user: string; readonly domain: string };
}

export const PROFILE: Profile = {
  name: 'Matt Wong',

  tagline: 'Software Engineer at AWS',

  bio: [
    `I'm a software engineer at Amazon Web Services, working on Amazon Athena and Amazon EMR.
     For the past five years I've built and optimized large-scale analytics and data lake
     infrastructure.`,
    `Before AWS I studied computer science and applied mathematics at the University of
     Maryland, College Park, staying on for a master's in computer science.`,
    `Feel free to reach out.`,
  ],

  avatar: 'assets/mattwong.jpg',
  avatarAlt: 'Matt Wong',

  // REVIEW: this PDF is from 2020.
  resume: 'assets/UpdatedResume_2020.pdf',

  // GPAs (3.90 M.S. / 3.84 B.S.) are on the résumé but deliberately left off here.
  education: [
    {
      credential: 'M.S. Computer Science',
      graduated: '2020 — 2021',
      field: 'University of Maryland, College Park',
    },
    {
      credential: 'B.S. Computer Science & Applied Mathematics',
      graduated: '2016 — 2020',
      field: 'University of Maryland, College Park',
    },
  ],

  skills: [
    { label: 'Languages', items: ['Java', 'Python', 'SQL'] },
    {
      label: 'AWS',
      items: ['Athena', 'EMR', 'ECS', 'S3', 'DynamoDB', 'CloudWatch', 'KMS', 'Lake Formation'],
    },
    {
      label: 'Data',
      items: ['Trino', 'Spark', 'Iceberg', 'Delta Lake', 'Hudi', 'Parquet', 'Avro'],
    },
    { label: 'Web', items: ['Angular', 'TypeScript', 'Node.js'] },
    // The résumé also lists a "Practices" group (distributed system design, benchmarking,
    // phased regional rollouts, threat modeling, oncall). Left off deliberately: the
    // Experience bullets already demonstrate all of it, which is stronger than asserting it.
  ],

  links: {
    github: 'https://github.com/wongmaster3',
    linkedin: 'https://www.linkedin.com/in/matthew-wong-0b14b1132/',
  },

  email: { user: 'matw81', domain: 'gmail.com' },
};
