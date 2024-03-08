module.exports = {
    ci: {
        collect: {
          url: 'https://ang-todotask.netlify.app/',
          numberOfRuns: 1,
        },
        upload: {
          target: "lhci",
          serverBaseUrl: "https://lighthouse-server-production-8084.up.railway.app",
          token: "0ac98669-2c1f-4b1d-99c2-4acd8f163e45", // Replace with your LHCI build token
        },
      },
  }; 