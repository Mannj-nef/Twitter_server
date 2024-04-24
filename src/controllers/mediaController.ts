import { Request, Response } from 'express';
import path from 'path';
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dirs';
import HTTP_STATUS from '~/constants/httpStatus';
import { IMedia } from '~/models/schemas/Media';
import { IResponseResult } from '~/interfaces/response';
import mediaServices from '~/services/media';
import fileSystem from 'fs';
import mime from 'mime';

const mediaControler = {
  // [POST] /medias/upload-image
  uploadImage: async (req: Request, res: Response<IResponseResult<IMedia[]>>) => {
    const result = await mediaServices.uploadImage(req);

    return res.json({
      message: 'success',
      result
    });
  },

  // [POST] /medias/upload-video
  uploadVideo: async (req: Request, res: Response<IResponseResult<IMedia[]>>) => {
    const result = await mediaServices.uploadvideo(req);

    return res.json({
      message: 'success',
      result
    });
  },

  // serve static file url
  //  [GET] /static/:name
  serveImage: (req: Request, res: Response) => {
    const { name } = req.params;
    return res.status(HTTP_STATUS.OK).sendFile(path.resolve(UPLOAD_IMAGE_DIR, name));
  },

  serveVideo: (req: Request, res: Response) => {
    const { name } = req.params;
    return res.status(HTTP_STATUS.OK).sendFile(path.resolve(UPLOAD_VIDEO_DIR, name));
  },

  serveStreamVideo: (req: Request, res: Response) => {
    const range = req.headers.range;

    if (!range) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header');
    }
    const { name } = req.params;
    const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name);
    // 1MB = 10^6 bytes (Tính theo hệ 10, đây là thứ mà chúng ta hay thấy trên UI)
    // Còn nếu tính theo hệ nhị phân thì 1MB = 2^20 bytes (1024 * 1024)

    // Dung lượng video (bytes)
    const videoSize = fileSystem.statSync(videoPath).size;
    // DUng lượng video cho mỗi phân đoạn stream
    const chunkSize = 30 * 10 ** 6; // 30MB
    // Lấy giá trị byte bắt đầu từ header Range (vd: bytes=1048576-)
    const start = Number(range.replace(/\D/g, ''));
    // Lấy giá trị byte kết thúc, vượt quá dung lượng video thì lấy giá trị videoSize - 1
    const end = Math.min(start + chunkSize, videoSize - 1);

    // Dung lượng thực tế cho mỗi đoạn video stream
    // THường đây sẽ là chunkSize, ngoại trừ đoạn cuối cùng
    const contentLength = end - start + 1;
    const contentType = mime.getType(videoPath) || 'video/*';

    /**
     * Format của header Content-Range: bytes <start>-<end>/<videoSize>
     * Ví dụ: Content-Range: bytes 1048576-3145727/3145728
     * Yêu cầu là `end` phải luôn luôn nhỏ hơn `videoSize`
     * ❌ 'Content-Range': 'bytes 0-100/100'
     * ✅ 'Content-Range': 'bytes 0-99/100'
     *
     * Còn Content-Length sẽ là end - start + 1. Đại diện cho khoản cách.
     * Để dễ hình dung, mọi người tưởng tượng từ số 0 đến số 10 thì ta có 11 số.
     * byte cũng tương tự, nếu start = 0, end = 10 thì ta có 11 byte.
     * Công thức là end - start + 1
     *
     * ChunkSize = 50
     * videoSize = 100
     * |0----------------50|51----------------99|100 (end)
     * stream 1: start = 0, end = 50, contentLength = 51
     * stream 2: start = 51, end = 99, contentLength = 49
     */
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType
    };
    res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers);
    const videoSteams = fileSystem.createReadStream(videoPath, { start, end });
    videoSteams.pipe(res);
  }
};

export default mediaControler;
