module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [ 'Link' ],
        specialLink: [ 'to' ],
      },
    ],
  },
};
