import { ObjectId } from 'mongodb';
import database from '~/databases';

const handleCreateHashTag = async (hashTags: string[]) => {
  const onlyUnique = (value: string, index: number, array: string[]) => {
    return array.indexOf(value) === index;
  };

  const uniqueHashTag = hashTags.filter(onlyUnique);

  const listHashtagID = await Promise.all(
    uniqueHashTag.map(async (hashtag) => {
      const hashTagItem = await database.hashTagMethods.findAndUpdate({ name: hashtag });
      return hashTagItem.value?._id;
    })
  );

  return { listHashtagID: listHashtagID as ObjectId[], lishHashtagName: uniqueHashTag };
};

export default handleCreateHashTag;
