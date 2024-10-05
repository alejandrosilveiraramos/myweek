export type MealPlan = {
  [day: string]: {
    [meal: string]: string;
  };
};

export type WaterIntake = {
  [day: string]: number;
};

export type MealChangeHandler = (
  day: string,
  meal: string,
  value: string
) => void;

export type WaterChangeHandler = (day: string, value: number[]) => void;
