import { CommandModule } from 'yargs';
import { apiParser } from '../src/api-parser';

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
    apiParser(argv['path']);
  },
};
