/**
 * Canonical public site URL used for Open Graph / Twitter card images.
 *
 * Vercel sets VERCEL_URL to the *deployment* hostname (often a preview URL like
 * popx-xxxx.vercel.app). Social crawlers cannot fetch images from those preview
 * URLs when deployment protection is enabled — so we must prefer the production
 * domain instead.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Known production domain for this project (fallback if env vars are missing).
  if (process.env.VERCEL_ENV === "production") {
    return "https://cola3d.vercel.app";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
