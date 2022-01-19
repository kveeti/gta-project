let accessToken = null;

export const setAccessToken = (value: string) => {
  accessToken = value;

  try {
    if (accessToken.length) localStorage.setItem("item", (Date.now() + 604800000).toString());
  } catch {}
};

export const getAccessToken = () => {
  return accessToken;
};
