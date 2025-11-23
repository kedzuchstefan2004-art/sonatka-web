module.exports = {
  onPreBuild: async () => {
    console.log('Pre-build step');
  },
  onBuild: async () => {
    console.log('Build step');
  },
  onPostBuild: async () => {
    console.log('Post-build step');
  },
};
