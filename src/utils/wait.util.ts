export const waitForTimeout = async (timeout: number) => {
  await new Promise((r) => setTimeout(r, timeout));
};
