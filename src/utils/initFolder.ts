import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dirs';
import { handleCreateFolder } from './file.util';

const initFoulder = () => {
  handleCreateFolder(UPLOAD_IMAGE_DIR);
  handleCreateFolder(UPLOAD_VIDEO_DIR);
};

export default initFoulder;
