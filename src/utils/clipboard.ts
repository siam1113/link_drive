export const copyToClipboard = async (value: string): Promise<boolean> => {
  try {
    if (!navigator.clipboard) {
      throw new Error("Browser doesn't have support for native clipboard.");
    }
    if (value) {
      await navigator.clipboard.writeText(value);
    }
    return true;
  } catch (error) {
    console.log(error?.toString());
    return false;
  }
};