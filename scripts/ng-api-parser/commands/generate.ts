import { CommandModule } from 'yargs';
import { apiDocGenerator } from "../src/api-doc-generator";

export const generateCommand: CommandModule = {
  command: ['generate'],
  describe: 'Generate a API documention',
  builder: (yargs) => {
    yargs.option('path', {
      describe: 'path to the directory to analyze',
      demandOption: true,
      type: 'string',
      normalize: true,
      requiresArg: true,
      string: true,
    });

    return yargs;
  },
  handler: async (argv: any) => {
    // console.log(`${argv['path']} is the chosen path to document`);
    apiDocGenerator(argv['path']);
  },
};

// yargs(hideBin(process.argv))
//   .scriptName('ng-api-parser')
//   .usage('$0 <cmd> [args]')
//   .command(
//     'generate',
//     'Generate an api documention',
//     (yargs) => {
//       yargs.option('path', {
//         describe: 'path to the directory to analyze',
//         demandOption: true,
//         type: 'string',
//         normalize: true,
//         requiresArg: true,
//         string: true,
//       });
//     },
//     (argv) => {
//       console.log(`${argv['path']} is the chosen path to document`);
//       // parser(argv['path'] as string);
//     }
//   )
//   .help().argv;
