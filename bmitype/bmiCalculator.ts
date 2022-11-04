const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100

  console.log('asd')
  const bmi = weight / (heightMeters * heightMeters)
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (healthy weight)'
  else if (bmi <= 100) return 'Low (asd)'
  return 'Unkown'
}

console.log(calculateBmi(180, 74))
