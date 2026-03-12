import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src fonts.gstatic.com",
              "img-src 'self' https: data:",
              "connect-src 'self' api.aladhan.com www.aljazeera.com thepeninsulaqatar.com www.gulf-times.com www.qna.org.qa www.bayt.com www.gulftalent.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
