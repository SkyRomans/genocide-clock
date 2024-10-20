/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.GITHUB_ACTIONS ? '/your-repo-name' : '',
    assetPrefix: process.env.GITHUB_ACTIONS ? '/your-repo-name/' : '',
};

export default nextConfig;
