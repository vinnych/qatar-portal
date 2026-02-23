// Vercel Serverless Function (Node.js)
// This file acts as a secure backend proxy to fetch XML feeds and bypass CORS.
import https from 'https';

export default async function handler(req, res) {
    // 1. Get the target RSS URL from the request query
    const targetUrl = req.query.url;

    // 2. Set permissive CORS headers so our frontend can access this data
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing target URL parameter (?url=...)' });
    }

    try {
        // 3. Fetch the XML from the external server
        const xmlData = await new Promise((resolve, reject) => {
            https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 QatarPortalProxy/1.0' } }, (proxyRes) => {
                let data = '';
                proxyRes.on('data', (chunk) => data += chunk);
                proxyRes.on('end', () => resolve(data));
            }).on('error', (err) => reject(err));
        });

        // 4. Basic Regex parsing to grab the first 3 items (since we don't have npm/xml-parser)
        const items = [];
        const itemRegex = /<item>[\s\S]*?<\/item>/gi;
        let match;

        while ((match = itemRegex.exec(xmlData)) !== null && items.length < 3) {
            const itemXml = match[0];

            // Extract title
            const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
            const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : "No Title";

            // Extract link
            const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
            const link = linkMatch ? linkMatch[1] : "#";

            // Extract pubDate
            const dateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
            const pubDate = dateMatch ? new Date(dateMatch[1]).toLocaleDateString() : new Date().toLocaleDateString();

            // Extract image (trying multiple common RSS image formats)
            let image = "https://images.unsplash.com/photo-1594916892556-b08e33f3cbf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
            const imgMatch1 = itemXml.match(/<media:content[^>]+url="([^"]+)"/i);
            const imgMatch2 = itemXml.match(/<enclosure[^>]+url="([^"]+)"[^\>]+type="image\//i);

            if (imgMatch1) image = imgMatch1[1];
            else if (imgMatch2) image = imgMatch2[1];

            items.push({ title, link, pubDate, image });
        }

        // 5. Send clean JSON back to the frontend
        return res.status(200).json({ status: 'ok', items });

    } catch (err) {
        console.error('Serverless Function Error:', err);
        return res.status(500).json({ error: 'Failed to proxy feed', details: err.message });
    }
}
