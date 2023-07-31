import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dirs';
import { handleCreateFolder } from './file.util';

const initFoulder = () => {
  handleCreateFolder(UPLOAD_IMAGE_TEMP_DIR);
  handleCreateFolder(UPLOAD_VIDEO_TEMP_DIR);
};

export default initFoulder;
