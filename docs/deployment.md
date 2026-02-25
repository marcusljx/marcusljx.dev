# Deployment & Development Documentation

## Deployment

This project is configured to deploy automatically to **GitHub Pages** whenever you push to the `main` branch or push a new git tag.

### Custom Domain (Squarespace)

To use your Squarespace domain with GitHub Pages:

1.  **GitHub Settings**:
    *   Go to your repository on GitHub.
    *   Settings > Pages.
    *   Under **Custom domain**, enter your domain (e.g., `yourdomain.com`) and click Save.
    *   Check **Enforce HTTPS** (it might take a few minutes to become available).

2.  **Squarespace DNS Settings**:
    *   Log in to Squarespace > Domains > [Your Domain] > DNS Settings.
    *   **A Records**: Add 4 A records pointing to GitHub's IPs:
        *   `185.199.108.153`
        *   `185.199.109.153`
        *   `185.199.110.153`
        *   `185.199.111.153`
        *   Host: `@`
    *   **CNAME Record**:
        *   Host: `www`
        *   Data: `[username].github.io`.

## Development

```bash
npm install
npm run dev
```

## Tags & Versions

To deploy a specific version:
```bash
git tag v1.0.0
git push origin v1.0.0
```
The CI will build the code at that tag and deploy it to GitHub Pages.
