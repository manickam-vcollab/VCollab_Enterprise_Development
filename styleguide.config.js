module.exports = {
    components: 'src/index.tsx',
    sections: [
      {
        name: 'layout',
        components: 'src/components/layout/**/*.tsx',
      },
      {
        name: 'probe',
        components: 'src/components/probe/**/*.tsx',
      },
      {
        name: 'shared',
        components: 'src/components/shared/**/*.tsx',
      },
      {
        name: 'Sidebar contents',
        components: 'src/components/sideBarContents/**/*.tsx',
      },
      {
        name: 'viewer',
        components: 'src/components/viewer/**/*.tsx',
      }
    ],

    ignore: [
    // test
    '**/*.test.{js,jsx,ts,tsx}', 
    '**/*.spec.{js,jsx,ts,tsx}', 
    '**/*.d.ts'
    ]
  }