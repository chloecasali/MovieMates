export type TimeUnit = "hours" | "minutes" | "seconds";

export type Duration = {
  [K in TimeUnit]?: number;
};
