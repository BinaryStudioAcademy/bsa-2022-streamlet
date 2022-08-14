const joinExistingValues = (values: string[], separator: string): string => {
  return values.filter(Boolean).join(separator);
};

export { joinExistingValues };
