type ObjectWithIdField = {
  id: string;
};

const isObjectUniqueIdContainInTwoArray = <T>(
  firstArray: T & ObjectWithIdField[],
  secondArray: T & ObjectWithIdField[],
): boolean => {
  for (const firstArrayElement of firstArray) {
    const isElementWithThisIdInSecondArray = secondArray.find((secondArrayElement) => {
      return secondArrayElement.id === firstArrayElement.id;
    });

    if (isElementWithThisIdInSecondArray) {
      return true;
    }
  }
  return false;
};

export { isObjectUniqueIdContainInTwoArray };
