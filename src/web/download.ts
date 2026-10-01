import JSZip from 'jszip';
import { buildProjectFiles, type AssetReader } from '../shared/generateProject';
import { projectFolderName, type PortfolioAnswers } from '../shared/types';

export function buildZip(answers: PortfolioAnswers, readAsset: AssetReader): JSZip {
  const zip = new JSZip();
  const files = buildProjectFiles(answers, readAsset);

  for (const [filePath, contents] of Object.entries(files)) {
    zip.file(filePath, contents);
  }

  return zip;
}

export async function downloadProject(
  answers: PortfolioAnswers,
  readAsset: AssetReader
): Promise<string> {
  const blob = await buildZip(answers, readAsset).generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `${projectFolderName(answers)}.zip`;

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  return fileName;
}