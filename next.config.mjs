/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.GITHUB_ACTIONS ? '/genocide-clock' : '',
    assetPrefix: process.env.GITHUB_ACTIONS ? '/genocide-clock/' : '',
};

export default nextConfig;
