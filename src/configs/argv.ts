import minimist from 'minimist';
import dotenv from 'dotenv';

dotenv.config();

const argv = minimist(process.argv.slice(2));

export const isProduction = Boolean(argv.production);
