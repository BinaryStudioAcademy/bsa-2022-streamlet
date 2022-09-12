import { Categories, Props as EmojiPickerProps } from 'emoji-picker-react';

const defaultEmojiPickerConfig: EmojiPickerProps = {
  autoFocusSearch: false,
  lazyLoadEmojis: false,
  showPreview: false,
  skinTonesDisabled: true,
  categories: [
    {
      name: 'Recently Used',
      category: Categories.SUGGESTED,
    },
    {
      name: 'Smiles & Emotions',
      category: Categories.SMILEYS_PEOPLE,
    },
    {
      name: 'Animals & Nature',
      category: Categories.ANIMALS_NATURE,
    },
    {
      name: 'Food & Drink',
      category: Categories.FOOD_DRINK,
    },
    {
      name: 'Travel',
      category: Categories.TRAVEL_PLACES,
    },
    {
      name: 'Activities',
      category: Categories.ACTIVITIES,
    },
  ],
};

export { defaultEmojiPickerConfig };
