module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    'declaration-colon-space-after': 'always',
  },
};
