import { Request } from 'express';
import fileSystem from 'fs';
import { isProduction } from '~/configs/argv';
import { MediaType } from '~/enums/media';
import IMedia from '~/interfaces/media';
import { uploadFile } from '~/utils/file.util';
import dotenv from 'dotenv';
import { formidableVideoOption } from '~/common/medias';

dotenv.config();

const uploadvideo = async (req: Request) => {
  const fileVideos = await uploadFile({ req, formidableOption: formidableVideoOption });

  const listUrlVideo: IMedia[] = fileVideos.map((file) => {
    // ["name", "mp4"]
    const nameSlpit = file.originalFilename?.split('.') as string[];
    const fileExtension = nameSlpit[nameSlpit.length - 1];

    fileSystem.renameSync(file.filepath, `${file.filepath}.${fileExtension}`);

    const hostVideoUrl = isProduction
      ? `${process.env.HOST}`
      : `http://localhost:${process.env.PORT}`;
    const videoURL = `${hostVideoUrl}/static/videos/${file.newFilename}.mp4`;

    return { url: videoURL, type: MediaType.Video };
  });

  return listUrlVideo;
};

export default uploadvideo;
