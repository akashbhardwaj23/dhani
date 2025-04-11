/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false,
    headers : [
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" }
    ]
};

export default nextConfig;
