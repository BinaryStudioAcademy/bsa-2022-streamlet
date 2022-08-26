const removeParamsFromRoutesPath = (path: string): string | undefined => {
  const params = path.split('/')[2];
  return path.replace(params, '');
};

export { removeParamsFromRoutesPath };
