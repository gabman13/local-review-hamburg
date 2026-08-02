# SterneWerk Personal Website

A simple one-page personal website for Leo Gabman, a Hamburg-based project helping local businesses improve online reputation and collect more customer reviews.

The site uses only:

- `index.html`
- `style.css`
- `script.js`

There are no frameworks, build tools, or dependencies. You can open `index.html` directly in a browser.

## Edit Personal Information

Open `index.html` and replace the placeholder values marked in comments:

- Replace `Leo Gabman` with your name.
- Replace `Hamburg` if you want to use another city.
- Replace `SterneWerk` with your project name.
- Update the page title and meta description if your positioning changes.
- Update the Open Graph URL from `https://your-username.github.io/your-repository/` to your real GitHub Pages URL.

## Edit Languages

The website includes German, Russian, and English versions. German is the default language.

Open `script.js` to edit the translated website copy:

- `de` controls the German version.
- `ru` controls the Russian version.
- `en` controls the English version.

To change the default language, update this line in `script.js`:

```js
const defaultLanguage = "de";
```

## Update Contact Links

In the contact section of `index.html`, replace:

- Telegram: `https://t.me/YOUR_USERNAME`
- WhatsApp: `https://wa.me/YOUR_PHONE_NUMBER`
- Email: `mailto:YOUR_EMAIL@example.com`

For WhatsApp, use international format without spaces or plus signs. Example:

```text
https://wa.me/491701234567
```

## Publish On GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Go to the repository on GitHub.
4. Open `Settings`.
5. Go to `Pages`.
6. Under `Build and deployment`, choose `Deploy from a branch`.
7. Select the `main` branch and the root folder.
8. Save the settings.

GitHub will publish the site and show you the public URL when deployment is ready.

## Local Preview

Open `index.html` directly in your browser. No server or build step is required.
