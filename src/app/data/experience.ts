/**
 * Work history, most recent first.
 *
 * Written at a deliberately higher altitude than the résumé: a public page indexed by
 * search engines is a different audience than a résumé sent to a recruiter, so
 * implementation and rollout specifics are summarised rather than spelled out.
 */

/**
 * A bullet. Authored as a bare string; use the object form only when the bullet has a
 * supporting link to cite. `Experience` normalises the two shapes before rendering.
 */
export interface Highlight {
  readonly text: string;
  readonly link?: { readonly label: string; readonly href: string };
}

export interface Role {
  readonly title: string;
  readonly org: string;
  /** Free text so ranges, single months, and "Present" all read naturally. */
  readonly period: string;
  readonly highlights: readonly (string | Highlight)[];
  readonly tags: readonly string[];
}

export const EXPERIENCE: readonly Role[] = [
  {
    title: 'Software Engineer',
    org: 'Amazon Web Services',
    period: 'September 2021 — Present',
    highlights: [
      `Led the migration of Amazon Athena onto a native filesystem implementation for reading
       and writing data in Amazon S3, replacing an older access layer that was being retired
       upstream. Beyond removing a growing maintenance liability, the change simplified the
       service's dependency footprint and opened up I/O optimizations the previous layer could
       not support. I helped with the design proposal, implementation, bug fixes, and the
       production rollout.`,

      `Owned the encryption and security workstream for that migration: tightened KMS key
       handling to explicit customer-specified keys and separated query-result from
       table-data encryption. Wrote the customer-facing migration guidance.`,

      {
        text: `Shipped Athena engine optimizations, including Parquet column index support for
         Apache Iceberg and a native filesystem read path, reducing data scanned by up to
         70% and improving query performance by up to 50% for qualifying workloads. I wrote
         this up for the AWS Big Data Blog:`,
        link: {
          label: 'How to use Parquet Column Indexes with Amazon Athena',
          href: 'https://aws.amazon.com/blogs/big-data/how-to-use-parquet-column-indexes-with-amazon-athena/',
        },
      },

      `Led integration of the Amazon CloudWatch agent into Amazon EMR for native cluster
       observability, and designed a monitoring UI surfacing cluster I/O, CPU, and memory
       so customers could tune workloads proactively.`,

      `Built an automated validation pipeline on ECS, DynamoDB, and S3 that provisions new
       EC2 instance types, runs compatibility and performance suites, and certifies them
       for production use in EMR clusters — cutting certification from weeks to days.`,
    ],
    tags: ['Athena', 'EMR', 'Iceberg', 'Spark', 'S3', 'Java', 'Python'],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Asymmetrik',
    period: 'June — August 2020',
    highlights: [
      `Built Angular components, services, and tests for a cryptocurrency analysis tool,
       and designed REST endpoints that reduced network calls and improved component load
       times.`,
      `Optimized MongoDB aggregation pipelines to speed up query performance.`,
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'Java'],
  },
  {
    title: 'Software Engineering Intern',
    org: 'M&T Bank',
    period: 'June — August 2019',
    highlights: [
      `Developed automated Selenium and TestNG test suites in Java for the bank's money
       transfer system, enabling data-driven validation of critical transaction workflows.`,
    ],
    tags: ['Java', 'Selenium', 'TestNG'],
  },
];
