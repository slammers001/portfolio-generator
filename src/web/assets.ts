import portfolioCss from '../shared/portfolio.css?raw';
import portfolioView from '../shared/PortfolioView.tsx?raw';
import typesModule from '../shared/types.ts?raw';
import type { AssetReader } from '../shared/generateProject';

const RAW_ASSETS: Record<string, string> = {
  'PortfolioView.tsx': portfolioView,
  'portfolio.css': portfolioCss,
  'types.ts': typesModule
};

/**
 * In the CLI these files are read from src/shared on disk; in the browser they are
 * bundled as strings. Either way the generator stays a pure function of the answers.
 */
export const readAsset: AssetReader = (fileName) => {
  const contents = RAW_ASSETS[fileName];
  if (contents === undefined) {
    throw new Error(`No bundled copy of ${fileName}`);
  }
  return contents;
};