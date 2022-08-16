import fse from 'fs-extra';

const sourceFolder = 'src/shared/mail-templates';
const destinationFolder = 'build/shared/mail-templates';

fse.copySync(sourceFolder, destinationFolder);
