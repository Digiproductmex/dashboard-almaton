/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Ignora los errores de ESLint durante el proceso de compilación de producción
    ignoreDuringBuilds: true,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
