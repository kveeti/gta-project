let accessToken = null;

export const setAccessToken = (value: string) => {
  accessToken = value;
};

export const getAccessToken = () => {
  if (!accessToken) return null;
  return accessToken;
};
