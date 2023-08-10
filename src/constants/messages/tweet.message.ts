const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  INVALID_TWEET_ID: 'Invalid tweet id',

  // content
  CONTENT_LENGTH_MUST_BE_FROM_1_TO_300: 'Content length must be from 1 to 100',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non-empty string',
  CONTENT_MUST_BE_STRING: 'Content must be  string',

  // audience
  AUDIENCE_MUST_BE_INVALID: 'audience must be is everyone or circle',
  AUDIENCE_MUST_BE_STRING: 'audience must be is string',

  // parentId
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',

  // type
  TYPE_MUST_BE_INVALID: 'type tweet must be one of `tweet`, `retweet`, `comment`, `quoteTweet`',
  TYPE_MUST_BE_STRING: 'type must be is string',

  // hashtags
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  HASHTAG_VALUE_MUST_BE_IN_CONTENT: 'Hashtag value must be in content',

  // mention
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'Mentions must be an array of user id',

  // media
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object',

  TWEET_NOT_FOUND: 'Tweet not found',
  TWEET_IS_NOT_PUBLIC: 'Tweet is not public',
  TWEET_ID_MUST_BE_IS_STRING: 'Tweet id must be is string',

  YOU_CANT_DELETE_TWEET: "you can't delete this tweet",

  USER_ID_MUST_BE_IS_STRING: 'UserId must be is string',
  USER_ID_MUST_BE_INVALID: 'UserId must be is ObjectId',

  // success
  CREATE_TWEET_SUCCESS: 'Create tweet successfully',
  DELETE_TWEET_SUCCESS: 'Delete tweet successfully'
} as const;

export default TWEETS_MESSAGES;
