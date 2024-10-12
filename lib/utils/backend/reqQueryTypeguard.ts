const typeGuard = (slag: string | string[] | undefined): string => {
  if (typeof slag === "undefined") {
    throw new Error();
  }
  if (Array.isArray(slag)) {
    return slag[0];
  }
  return slag;
};

export default typeGuard;
