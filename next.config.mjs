/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'firebasestorage.googleapis.com' }, { hostname: 'images.ctfassets.net' }, { hostname: "lh3.googleusercontent.com" }],
        dangerouslyAllowSVG: true
    }
};

// const nextConfig = {
//     images: {
//         remotePatterns: [{ hostname: 'firebasestorage.googleapis.com' }],
//         dangerouslyAllowSVG: true
//     }
// };





export default nextConfig;
