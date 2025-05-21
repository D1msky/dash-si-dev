# Dashboard Selli Project

This is a [**Next.js**](https://nextjs.org) project bootstrapped with [**`create-next-app`**](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses Tailwind CSS v4 and Ant Design for styling and components.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [**http://localhost:3000**](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Features

- Next.js 15 with App Router
- Tailwind CSS v4 for styling
- Ant Design components
- React 19
- Custom utility scripts for common development tasks

## Technology Stack

- **Frontend Framework**: Next.js 15
- **Styling**: Tailwind CSS v4 + Ant Design
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Code Quality**: ESLint, Prettier

## Development Tools

This project includes several utility scripts to help with common development tasks:

### Fix Tailwind CSS Issues

If you experience issues with Tailwind CSS v4 and Ant Design integration, run:

```bash
# For all platforms (Windows, Mac, Linux)
npm run fix:tailwind:js

# Alternative for Mac/Linux/Git Bash on Windows
npm run fix:tailwind
```

This script:
- Updates PostCSS configuration to use `@tailwindcss/postcss`
- Fixes global CSS with proper imports and compatibility fixes
- Updates layout files to include the AntdRegistry wrapper
- Updates Tailwind config to use ES module format
- Cleans the Next.js build cache

### Clear Cache and Restart

If you experience strange build issues or stale cache problems:

```bash
npm run reset:cache
```

This removes the `.next` folder and restarts the development server.

### Clean Project and Reinstall

For a complete fresh start (useful after major updates):

```bash
npm run clean:all
```

This removes the `.next` and `node_modules` folders, reinstalls dependencies, and restarts the development server.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CSS styles not applying correctly | Run `npm run fix:tailwind:js` |
| Strange build errors | Run `npm run reset:cache` |
| After package updates | Run `npm run clean:all` |
| Components not rendering | Check browser console for errors |

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.