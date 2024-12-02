# Web Dev Drops

Source code for the [Web Dev Drops](https://www.webdevdrops.com/) blog.

## Architecture

The project is a monolithic web application built with [Next.js](https://nextjs.org/), using the app router, and written in [TypeScript](https://www.typescriptlang.org/).

The posts are written in [MDX](https://mdxjs.com/) and stored in the `posts` directory. They are fetched at build time and rendered as static pages.

### Features

#### Posts

Posts are written in MDX and can include code snippets, images, and other media. They can also include front matter with metadata like title, date, and tags.

Code snippets are syntax highlighted with [Highlight.js](https://highlightjs.org/).

#### I18n

The blog is available in English and Portuguese. The language is initially set based on the user's browser preferences and can be changed by the user.

Some posts are only available in one language, while others have translations. Posts that have translations are linked to each other and have proper hreflang and alternate tags.

Lists of posts are paginated and filtered by current language.

#### Tags

Posts can have tags, which are used to group related posts. Tags are listed on the post page and can be used to filter posts.

#### Dark Mode

The blog has a dark mode that can be toggled by the user. The user's preference is saved in local storage and applied on subsequent visits.

#### Contact Form

The blog has a contact form that can be used to send messages to the blog owner. The form is protected by [Recaptcha](https://www.google.com/recaptcha) and submitted to a serverless function that sends an email using [Amazon SES](https://aws.amazon.com/ses/).

### Tests

The project has end-to-end (E2E) tests written with [Cypress](https://www.cypress.io/). The tests cover the main user flows, like navigating to the home page, reading a post, and changing the language.

> TODO: Add unit tests.

## Local Setup and Development

### Prerequisites

Node.js LTS version with NPM.

### Running the Development Server

Install the dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

### Running Tests

Build the app and run the E2E tests with Cypress

```bash
npm run test:e2e:run
```

Start the development server and open Cypress for interactive testing

```bash
npm run test:e2e:open
```

### Writing New Posts

Create a new folder under `posts` with the post slug and add an `index.mdx` file with the post content.

Use the front matter to add metadata:

- `title`: The post title (required)
- `date`: The post date in `YYYY-MM-DD` format (required)
- `tags`: An array of tags (optional)
- `coverImage`: The post cover image (required)
- `language`: The post language (`en` or `pt-BR`) (required)
- `translations`: An array of translations for the post, with the language key and post slug (optional)

Images and other files related to the post should be stored in the `public/<post-slug>` folder.

> TODO: consider co-locating images with the post content

## NPM Scripts

| Script                  | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `npm run dev`           | Starts the development server                                   |
| `npm run build`         | Builds the application for production                           |
| `npm run build:analyze` | Builds the application and analyzes the bundle size             |
| `npm run start`         | Starts the production server                                    |
| `npm run lint`          | Runs ESLint to check for linting errors                         |
| `npm run typecheck`     | Runs TypeScript compiler to check for type errors               |
| `npm run cy:open`       | Opens Cypress for interactive testing                           |
| `npm run cy:run`        | Runs Cypress tests in headless mode                             |
| `npm run test:e2e:open` | Starts the dev server and opens Cypress for interactive testing |
| `npm run test:e2e:run`  | Builds the app and runs Cypress tests in headless mode          |

## CI

The project uses [GitHub Actions](https://docs.github.com/en/actions) for continuous integration.

The CI pipeline builds the app and runs E2E tests on every PR and push to the `main` branch.

## Deployment

The project is deployed to [Vercel](https://vercel.com/) using the [Vercel for GitHub](https://vercel.com/github) integration.

## License

1. You are free to use this code as inspiration.
2. Please, do not copy it directly.
3. Please, do not use the "Web Dev Drops" name, logo, or posts contents.
