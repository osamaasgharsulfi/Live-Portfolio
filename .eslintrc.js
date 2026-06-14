module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // Existing rules
    'prefer-template': 0,
    'react/no-children-prop': [0],
    'linebreak-style': 0,

    // Add these to disable errors you're facing
    'jsx-a11y/no-distracting-elements': 0, // Disables <marquee> error
    'react/no-unknown-property': 0, // Allows "behavior" or other unknown attributes
    'quotes': [0], // Disables quotes style checking
    'no-multiple-empty-lines': [0], // Allows empty lines
    'import/newline-after-import': 0,     // Disable the empty line after import rule
    'import/extensions': 0, 
    'no-trailing-spaces': 'off', // Disable trailing spaces rule
    'react/jsx-tag-spacing': 'off', // Disable space before closing bracket rule    
        
  },
};
