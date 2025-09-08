# MVP MedJohn

A simple, modern Single Page Application (SPA) for meeting and project management, built with semantic HTML and custom CSS.

## Features

- **Responsive SPA Layout**: The application uses a single HTML file with dynamic sections, simulating SPA behavior without JavaScript frameworks.
- **Semantic HTML**: All elements use semantic tags and ARIA attributes for accessibility and SEO.
- **Custom CSS**: Modern, maintainable CSS for layout, theming, and component styling.
- **Header Navigation**: Includes dropdown menus for spaces, people, and creation of new items.
- **Sidebar**: Quick navigation with SVG icons for Home, Agenda, Quote, and List.
- **Main Section**: Displays meeting notes, agenda, attendees, and a breakdown chart.
- **Modals**: Accessible modal dialogs for adding, editing, and deleting agenda items.
- **Dropdowns & Toggles**: Custom dropdowns and toggles for notifications, settings, help, and user profile.
- **Dark Mode Toggle**: Switch between light and dark themes using a custom property-based toggle.
- **SVG Icons**: Inline and external SVGs for crisp, scalable UI icons, with support for CSS-based coloring.

## Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/szczepanskimichal/mvpMedJohn.git
   cd mvpMedJohn
   ```
2. Open `index.html` in your browser. No build step or server required.

## Accessibility & Semantics
- Uses ARIA roles and labels for navigation, modals, and forms.
- All interactive elements are keyboard accessible.
- Forms and modals use proper labeling and focus management.

## Customization
- All colors and themes are managed via CSS custom properties for easy theming.
- SVG icons can be recolored using CSS variables and `currentColor`.

## Project Structure
- `index.html` – Main SPA file
- `style.css` – Custom styles
- `img/` – SVG icons and images


