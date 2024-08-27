/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }],
        dangerouslyAllowSVG: true
    }
};

export default nextConfig;
