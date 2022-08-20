type ValueForJoin = string | undefined;

const joinExistingValues = (joiningValues: ValueForJoin[], separator: string): string => {
  return joiningValues.filter(Boolean).join(separator);
};

export { joinExistingValues };
