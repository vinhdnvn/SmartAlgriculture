/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['images.unsplash.com',   'res.cloudinary.com']
    },
    experimental: {
        appDir: true,
      }

    
}

module.exports = nextConfig
