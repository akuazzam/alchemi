// next.config.js

module.exports = {
    async redirects() {
      return [
        {
          source: '/protected',
          destination: '/',
          permanent: false,
        },
        // Add more redirect configurations if needed
      ];
    },
  };
  