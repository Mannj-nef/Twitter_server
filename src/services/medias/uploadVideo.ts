import { Request } from 'express';
import fileSystem from 'fs';
import { MediaType } from '~/enums/media';
import { IMedia } from '~/models/schemas/Media';
import { uploadFile } from '~/utils/file.util';
import dotenv from 'dotenv';
import { formidableVideoOption } from '~/common/medias';
import { uploadS3 } from '~/utils/s3';
import fs from 'fs';
import { UPLOAD_VIDEO_DIR } from '~/constants/dirs';

dotenv.config();

const uploadVideo = async (req: Request) => {
  const fileVideos = await uploadFile({ req, formidableOption: formidableVideoOption });

  const listUrlVideo: IMedia[] = await Promise.all(
    fileVideos.map(async (file) => {
      const nameSplit = file.originalFilename?.split('.') as string[]; // ["name", "mp4"]
      const fileExtension = nameSplit[nameSplit.length - 1];
      const newPath = `${UPLOAD_VIDEO_DIR}/${file.newFilename}.${fileExtension}`;

      fileSystem.renameSync(file.filepath, `${file.filepath}.${fileExtension}`);

      console.log(`videos/${nameSplit[0]}.${fileExtension}`);

      const videoURL = await uploadS3({
        fileName: `videos/${nameSplit[0]}.${fileExtension}`,
        file: fs.readFileSync(newPath),
        ContentType: 'video/mp4'
      });

      fileSystem.unlinkSync(`${file.filepath}.${fileExtension}`);

      return { url: videoURL, type: MediaType.Video };
    })
  );

  return listUrlVideo;
};

export default uploadVideo;
