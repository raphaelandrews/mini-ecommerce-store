const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tailwindui.com",
      "uploadthing.com", 
      "utfs.io"
    ]
  }
}

module.exports = withNextIntl(nextConfig);
