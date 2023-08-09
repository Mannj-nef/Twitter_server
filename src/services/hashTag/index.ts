import handleCreateHashTag from './createHashtag';

class HashTagService {
  findAndUpdateHashTag = handleCreateHashTag;
}

const hashTagService = new HashTagService();
export default hashTagService;
