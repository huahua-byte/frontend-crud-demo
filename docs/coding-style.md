# Coding Style

## HTML
- Use semantic HTML5 elements (`<main>`, `<section>`, `<article>`, etc.)
- Use BEM naming for CSS classes (e.g., `item__title`, `item--active`)

## CSS
- Use CSS custom properties (variables) for colors and spacing
- Mobile-first responsive design
- Put all styles in `css/style.css`

## JavaScript
- Use ES6+ features (const/let, arrow functions, template literals, destructuring)
- Use `js/store.js` for localStorage CRUD operations
- Use `js/app.js` as the main entry point
- All DOM manipulation in `js/ui.js`
- Event delegation on parent containers, not individual items
