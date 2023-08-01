import media from './medias';

class MediaServices {
  uploadImage = media.uploadImage;
  uploadvideo = media.uploadvideo;
}

const mediaServices = new MediaServices();
export default mediaServices;
