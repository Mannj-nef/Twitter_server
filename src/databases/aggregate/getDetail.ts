import { ObjectId } from 'mongodb';

const detailTweet = [
  {
    $match: {
      _id: new ObjectId('64d9eb6fbd16013ba1ade5de')
    }
  },
  {
    $lookup: {
      from: 'hashtags',
      localField: 'hashtags',
      foreignField: '_id',
      as: 'hashtags'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'mentions',
      foreignField: '_id',
      as: 'mentions'
    }
  },
  {
    $addFields: {
      mentions: {
        $map: {
          input: '$mentions',
          as: 'mentions',
          in: {
            _id: '$$mentions._id',
            name: '$$mentions.name',
            email: '$$mentions.email',
            username: '$$mentions.username',
            avatar: '$$mentions.avatar'
          }
        }
      }
    }
  },
  {
    $lookup: {
      from: 'bookmarks',
      localField: '_id',
      foreignField: 'tweet_id',
      as: 'bookmark'
    }
  },
  {
    $lookup: {
      from: 'likes',
      localField: '_id',
      foreignField: 'tweet_id',
      as: 'likes'
    }
  },
  {
    $lookup: {
      from: 'tweet',
      localField: '_id',
      foreignField: 'parent_id',
      as: 'reply'
    }
  },
  {
    $addFields: {
      bookmark: {
        $size: '$bookmark'
      },
      likes: {
        $size: '$likes'
      },
      reply: {
        $size: '$reply'
      }
    }
  }
];

export default detailTweet;
