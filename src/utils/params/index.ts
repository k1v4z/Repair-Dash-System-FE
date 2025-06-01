export const processFilterParams = (
  paramsList: string[],
  urlParams: URLSearchParams
) => {
  const params = paramsList.map((param) => {
    const value = urlParams.get(param);
    return { [param]: value };
  });

  const processedParams = params.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];
    const value = curr[key];
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return processedParams;
};
