// tailles et graisses du texte relevées sur la maquette figma
// on garde la police du téléphone, aucune police n'est chargée

// la clé est la taille de la maquette, size[16] vaut 16
const size = {
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  30: 30,
  46: 46,
  52: 52,
};

type WeightName = "regular" | "medium" | "semibold" | "bold" | "extrabold";
type Weight = "400" | "500" | "600" | "700" | "800";

// typées pour être acceptées par fontWeight dans un StyleSheet
const weight: Record<WeightName, Weight> = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};

export const typography = { size, weight };
