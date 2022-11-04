interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  average: number;
}

const calculateExercises = (arr: number[], target: number): Result => {
  const obj: Result = {} as Result;
  obj.periodLength = arr.length;
  obj.target = target;

  let sum = 0;
  let days = 0;

  for (const value of arr) {
    days += value > 0 ? 1 : 0;
    sum += value;
  }
  obj.trainingDays = days;
  obj.average = sum / arr.length;

  if (obj.average > 3) obj.rating = 3;
  else if (obj.average > 2) obj.rating = 2;
  else obj.rating = 1;

  obj.success = obj.rating >= obj.target;
  obj.ratingDescription = "asd";
  return obj;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
