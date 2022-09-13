import { CommentMenuOptions, IconName } from 'common/enums/enums';

const matchMenuOptionWithIconName: Record<CommentMenuOptions, IconName> = {
  [CommentMenuOptions.EDIT]: IconName.EDIT,
  [CommentMenuOptions.DELETE]: IconName.DELETE,
  // [CommentMenuOptions.REPORT]: IconName.REPORT,
};

const matchMenuOptionWithText: Record<CommentMenuOptions, string> = {
  [CommentMenuOptions.EDIT]: 'Edit',
  [CommentMenuOptions.DELETE]: 'Delete',
  // [CommentMenuOptions.REPORT]: 'Report',
};

const allCommentMenuOptions = [
  CommentMenuOptions.EDIT,
  CommentMenuOptions.DELETE,
  // CommentMenuOptions.REPORT,
].map((option) => ({
  type: option,
  text: matchMenuOptionWithText[option],
  icon: matchMenuOptionWithIconName[option],
}));

export { allCommentMenuOptions };
