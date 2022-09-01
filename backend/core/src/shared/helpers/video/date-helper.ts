const returnSubtractedDate = (subtractedDate?: number): Date => {
  if (!subtractedDate) {
    return new Date(new Date().toDateString());
  }

  return new Date(new Date().getTime() - subtractedDate);
};

export { returnSubtractedDate };
