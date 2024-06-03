import media from './medias';

class MediaServices {
  uploadImage = media.uploadImage;
  uploadVideo = media.uploadVideo;
}

const mediaServices = new MediaServices();
export default mediaServices;
