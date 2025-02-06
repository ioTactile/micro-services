export const getCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getIdFromSlug = (slug: string) => {
  return slug.split("-").pop()!;
};
