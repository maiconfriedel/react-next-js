export async function getCredentialsRefreshToken(token: any) {
  const body = {
    refresh_token: token.refreshToken,
  };

  const refreshedToken = await fetch(
    "http://localhost:3333/login/refresh_token",
    {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await refreshedToken.json();

  const today = new Date();

  return {
    ...token,
    accessToken: response.access_token,
    accessTokenExpires: today.setHours(today.getHours() + 1),
    refreshToken: response.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    provider: token.provider,
  };
}
