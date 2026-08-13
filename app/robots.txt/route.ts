export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin pages if any
# Disallow: /admin

Sitemap: https://ofarotech.com/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
