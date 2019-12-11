import { promises } from 'fs';
import { join, extname } from 'path';

export interface TestFile {
  content: string;
  path: string;
}

const encoding = 'utf8';
const validExtensions = ['.whaam'];

async function loadTestFile(path: string): Promise<string> {
  return await promises.readFile(path, { encoding });
}

async function loadTestsInDirectory(path: string): Promise<TestFile[]> {
  const files = await promises.readdir(path, { encoding });

  return await Promise.all(
    files
      .filter(fileName => {
        const extension = extname(fileName.toLowerCase());

        return validExtensions.includes(extension);
      })
      .map(fileName => join(path, fileName))
      .map(async(filePath) => {
        const content = await loadTestFile(filePath);

        return {
          content,
          path: filePath
        };
      })
    );
}

export default async function loadTests(paths: string[]): Promise<TestFile[]> {
  const testsInDirectories = await Promise.all(
    paths.map(path => loadTestsInDirectory(path))
  );

  return testsInDirectories.reduce((carry, item) => {
    return [...carry, ...item];
  }, []);
}
