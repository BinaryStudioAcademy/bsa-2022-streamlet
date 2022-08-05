import { AsyncContainerModule, Container, ContainerModule } from 'inversify';
import path from 'path';
import glob from 'glob';

interface DIContainerInterface {
  syncModules: ContainerModule[];
  asyncModules: AsyncContainerModule[];
}

export const importContainerModuleInstancesFromDirectories = (
  directories: string[],
  formats = ['.js', '.ts'],
): DIContainerInterface => {
  const loadFileClasses = function (
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    exported: ContainerModule | any,
    allLoaded: DIContainerInterface,
  ): DIContainerInterface {
    if (exported instanceof ContainerModule) {
      allLoaded.syncModules.push(exported);
    } else if (exported instanceof AsyncContainerModule) {
      allLoaded.asyncModules.push(exported);
    } else if (exported instanceof Array) {
      exported.forEach((i) => loadFileClasses(i, allLoaded));
    } else if (exported instanceof Object || typeof exported === 'object') {
      Object.keys(exported || {}).forEach((key) => loadFileClasses(exported[key], allLoaded));
    }
    return allLoaded;
  };

  const allFiles = directories.reduce((allDirs, dir) => allDirs.concat(glob.sync(path.normalize(dir))), [] as string[]);

  const dirs = allFiles
    .filter(
      (file) => formats.indexOf(path.extname(file)) !== -1 && file.substring(file.length - 5, file.length) !== '.d.ts',
    )
    .map((file) => require(file));

  return loadFileClasses(dirs, { syncModules: [], asyncModules: [] });
};

export const createDIContainer = async (containerModulesDirs: string[]): Promise<Container> => {
  const container = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true });

  const { syncModules, asyncModules } = importContainerModuleInstancesFromDirectories(containerModulesDirs);
  await container.loadAsync(...asyncModules);
  container.load(...syncModules);

  return container;
};
