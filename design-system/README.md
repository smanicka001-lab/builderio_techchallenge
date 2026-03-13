# Carbon Design System - Storybook

This is a Storybook application showcasing IBM Carbon Design System components for the design team to explore and customize for production use.

## What's Included

This Storybook includes the following Carbon components:

- **Button** - Primary, secondary, tertiary, danger, and ghost variants with different sizes
- **TextInput** - Text inputs with various states (default, invalid, warning, disabled)
- **Tile** - Multiple tile variants (default, clickable, selectable, expandable)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

From the `design-system` directory, install dependencies:

```bash
npm install --legacy-peer-deps
```

Note: We use `--legacy-peer-deps` due to version compatibility between Vite 8 and Storybook 8.

### Running Storybook

Start the Storybook development server:

```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006`

### Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

The built files will be in the `storybook-static` directory.

## Project Structure

```
design-system/
├── .storybook/          # Storybook configuration
│   ├── main.js          # Main Storybook config
│   └── preview.js       # Preview config with Carbon styles
├── src/
│   └── stories/         # Component stories
│       ├── Button.stories.jsx
│       ├── TextInput.stories.jsx
│       └── Tile.stories.jsx
├── package.json
└── README.md
```

## Styling

Carbon components in this Storybook come with their own built-in styles, so they will render correctly out of the box. The components use CSS-in-JS and inline styles for portability.

## Customizing Components

### Theming

For production use, you can customize Carbon components using SCSS variables:

1. Install `sass` in your production application
2. Import and configure Carbon's theme variables:

```scss
// In your main app styles
@use '@carbon/react/scss/themes' with (
  $theme: (
    'interactive-01': #0062ff,  // Primary button color
    'interactive-02': #393939,  // Secondary button color
    'ui-background': #ffffff,   // Background color
    // Add more custom colors
  )
);
@use '@carbon/react/scss/components';
```

3. Alternatively, override CSS custom properties in your application:

```css
:root {
  --cds-interactive-01: #0062ff;
  --cds-interactive-02: #393939;
}
```

### Adding More Components

To add more Carbon components:

1. Create a new `.stories.jsx` file in `src/stories/`
2. Import the component from `@carbon/react`
3. Define the story configuration and variants
4. Storybook will automatically detect and display it

## Resources

- [Carbon Design System](https://carbondesignsystem.com/)
- [Carbon React Components](https://react.carbondesignsystem.com/)
- [Storybook Documentation](https://storybook.js.org/)

## Design Team Notes

Use this Storybook to:

- Explore all available Carbon component variants
- Test component states and interactions
- Document design decisions for production implementation
- Share component specifications with developers
- Create a custom component library based on Carbon

## Support

For questions or issues with this Storybook setup, please contact the development team.
