

export const HeaderButtonType = {
  None: null,
  Back: 'arrow_back_ios',
  Close: 'close',
} as const;
export type HeaderButtonType = typeof HeaderButtonType[keyof typeof HeaderButtonType];