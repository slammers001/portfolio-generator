import { buildProjectFiles, type AssetReader } from '../shared/generateProject';
import { projectFolderName, type PortfolioAnswers } from '../shared/types';

export async function downloadProject(
  answers: PortfolioAnswers,
  readAsset: AssetReader
): Promise<string> {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();

  for (const [filePath, contents] of Object.entries(buildProjectFiles(answers, readAsset))) {
    zip.file(filePath, contents);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
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