import yargs from 'yargs';
import readline from 'readline';
import path from 'path';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionSync = (query: string) => new Promise<string>((res) => {
  rl.question(query, (answer) => {
    res(answer);
  });
});

const commandOptions = ['page', 'component'] as const;
type CommandOptions = (typeof commandOptions)[number]

const create = async (mode: CommandOptions) => {
  const name = await questionSync('Name?');
  const pagesDir = path.join(process.cwd(), 'pages');
  const componentsDir = path.join(process.cwd(), 'components');
  const styleDir = path.join(process.cwd(), 'styles');
  const dirName = name.split('/').slice(0, name.split('/').length - 1).join('/');
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir);
  }
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
  }
  if (!fs.existsSync(styleDir)) {
    fs.mkdirSync(styleDir);
  }
  if (name.includes('/')) {
    // create folder
    if (mode === 'page') {
      const targetPageDir = path.join(pagesDir, dirName);
      if (!fs.existsSync(targetPageDir)) {
        fs.mkdirSync(targetPageDir, {recursive: true});
      }
      const targetStyleDir = path.join(styleDir, dirName);
      if (!fs.existsSync(targetStyleDir)) {
        fs.mkdirSync(targetStyleDir, {recursive: true});
      }
    }
  }
  const themeFilePath = path.join(styleDir, 'theme.scss');
  const hasThemeFile = fs.existsSync(themeFilePath);
  const upperName = name.split('/').map((x) => x.split('')[0].toUpperCase() + x.split('').slice(1).join('')).join('');
  if (mode === 'component') {
    const tsxFile = `import React from 'react';
import classes from '../styles/${upperName}.module.scss';

export const ${upperName}: React.FC<{}> = () => {
  return (
    <div className={classes.root}>
      {/* write here */}
    </div>
  );
};
`;
    const styleFile = `${hasThemeFile ? `` : '//'}@import "styles/theme.scss";
.root {
    display: block;
}

// write another class
`;
    if (fs.existsSync(path.join(componentsDir, upperName + '.tsx'))) {
      console.warn('components file already exists');
    } else {
      fs.writeFileSync(path.join(componentsDir, upperName + '.tsx'), tsxFile);
    }
    if (fs.existsSync(path.join(componentsDir, upperName + '.module.scss'))) {
      console.warn('components style file already exists');
    } else {
      fs.writeFileSync(path.join(styleDir, upperName + '.module.scss'), styleFile);
    }
  }
  if (mode === 'page') {
    const fileName = name.split('/').slice(-1)[0];
    const tsxFile = `import React from 'react';
import classes from 'styles/${dirName}/${fileName}.module.scss';
import {NextPage} from 'next';
import {SmartHead} from 'components/SmartHead';

const ${upperName}Page: NextPage<{}> = () => {
  return (
    <div className={classes.root}>
      <SmartHead
        title={'${upperName}'}
      />
      {/* write here */}
    </div>
  );
};

export default ${upperName}Page;
`;
    const styleFile = `${hasThemeFile ? `` : '//'}@import "styles/theme.scss";
.root {
  display: block;
}

// write another class
`;
    if (fs.existsSync(path.join(componentsDir, upperName + '.tsx'))) {
      console.warn('page file already exists');
    } else {
      fs.writeFileSync(path.join(pagesDir, dirName, fileName + '.tsx'), tsxFile);
    }
    if (fs.existsSync(path.join(componentsDir, upperName + '.module.scss'))) {
      console.warn('page style file already exists');
    } else {
      fs.writeFileSync(path.join(styleDir, dirName, fileName + '.module.scss'), styleFile);
    }
  }
  return;
};

const main = async () => {
  const argv = yargs
      .command('create <mode>', 'create command', (yargs) => {
        yargs.positional('mode', {
          type: 'string',
          choices: commandOptions,
          describe: 'create components or create page',
        });
      }).command('delete <mode>', 'delete command', (yargs) => {
        yargs.positional('mode', {
          type: 'string',
          choices: commandOptions,
          describe: 'delete components or create page (also scss will be destroyed)',
        });
      }).help().argv;

  if (argv._.includes('create')) {
    // create page or components with scss
    await create(argv.mode as CommandOptions);
  }
  process.exit(0);
};

main();
