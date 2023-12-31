# Website Analysis 📊

The "Website Analysis API" is a Node.js project that utilizes advanced pattern recognition techniques to identify specific technologies and other relevant data, providing insightful output. It enables automated detection of frameworks, databases, languages, and other tools used in a project, presenting this information in a clear and organized manner.

**If you have knowledge about patterns or more please consider creating a PullRequest for the `src/stack/technologies.json` file.**

## Installation

```bash
npm install website-analysis-api
```

## Usage

```js
import WebsiteAnalyzer from './WebsiteAnalyzer';

const analyzer = new WebsiteAnalyzer({
    url: 'https://example.com'
});

analyzer.analyze();
```

## Answer Layout

This is how a answer might look like:

```js
[
  {
    name: 'Cloudflare',
    group: 'Security',
    website: 'https://www.cloudflare.com/',
    github: undefined,
    category: 'Security',
    description: 'Cloudflare is a service that offers CDN and DNS hosting.',
    isSaaS: true,
    isPaid: true
  },
  {
    name: 'Next.js',
    group: 'Web development',
    website: 'https://nextjs.org/',
    github: 'https://github.com/vercel/next.js',
    category: 'JavaScript frameworks',
    description: 'Next.js is a minimalistic framework for server-rendered React applications.',
    isSaaS: false,
    isPaid: false
  },
  {
    name: 'React',
    group: 'Web development',
    website: 'https://react.dev/',
    github: 'https://facebook.github.io/react/',
    category: 'JavaScript frameworks',
    description: 'React is a JavaScript library for building user interfaces.',
    isSaaS: false,
    isPaid: false
  },
  {
    name: 'Tailwind CSS',
    group: 'Web development',
    website: 'https://tailwindcss.com/',
    github: 'https://github.com/tailwindlabs/tailwindcss',
    category: 'UI frameworks',
    description: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.',
    isSaaS: false,
    isPaid: false
  }
]
```

## Currently supported technologies
- Algolia
- Amazon Web Services
- cdnjs
- Cloudflare
- Google Analytics
- MediaElement.js
- PHP
- jQuery
- next.js
- React
- Twitter SEO
- TailwindCSS
- Vercel
- VueJs
- Webpack
- Wordpress

# Methods used for scanning

|Method|Description|
|--|--|
|`dns`|Checking inside the dns records if something matches the regex of an product (e.g. Vercel or Cloudflare)|
|`regex`|Checking the website content to the given regex expression|
|`header` (PLANNED)|Checking the resonse headers to search for product|
|`cookie` (PLANNED)|Checking the given cookies to search for the product|

## Issues

If you have issues with the files in the stack folder, you can simply download them and define the path yourself with the `technologiesFile`, `groupsFile` and `categoriesFile` path. You can also just use it to use custom files.
