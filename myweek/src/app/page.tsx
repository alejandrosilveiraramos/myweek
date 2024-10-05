'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Slider } from '../components/ui/slider'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type MealPlan = {
  [day: string]: {
    [meal: string]: string
  }
}

export type WaterIntake = {
  [day: string]: number
}

export type MealChangeHandler = (
  day: string,
  meal: string,
  value: string
) => void

export type WaterChangeHandler = (day: string, value: number[]) => void

const DAYS: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]
const MEALS: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
const MEAL_OPTIONS: string[] = [
  'Oatmeal with fruits',
  'Grilled chicken salad',
  'Salmon with vegetables',
  'Greek yogurt with nuts',
  'Vegetable stir-fry',
  'Whole grain toast with avocado',
  'Quinoa bowl with mixed veggies',
]

export default function NutritionPlanner() {
  const [mealPlan, setMealPlan] = useState<MealPlan>(
    DAYS.reduce((acc, day) => {
      acc[day] = MEALS.reduce((mealAcc, meal) => {
        mealAcc[meal] = ''
        return mealAcc
      }, {} as { [meal: string]: string })
      return acc
    }, {} as MealPlan)
  )

  const [waterIntake, setWaterIntake] = useState<WaterIntake>(
    DAYS.reduce((acc, day) => {
      acc[day] = 0
      return acc
    }, {} as WaterIntake)
  )

  const handleMealChange: MealChangeHandler = (day, meal, value) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value,
      },
    }))
  }

  const handleWaterChange: WaterChangeHandler = (day, value) => {
    setWaterIntake((prev) => ({
      ...prev,
      [day]: value[0],
    }))
  }

  const calculateScore = (): number => {
    const mealScore =
      (Object.values(mealPlan).flat().filter(Boolean).length /
        (DAYS.length * MEALS.length)) *
      50
    const waterScore =
      (Object.values(waterIntake).reduce((sum, val) => sum + val, 0) /
        (DAYS.length * 8)) *
      50
    return Math.round(mealScore + waterScore)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Control Planner</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DAYS.map((day) => (
          <Card
            key={day}
            className="w-full"
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {day}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {MEALS.map((meal) => (
                <div
                  key={meal}
                  className="mb-4"
                >
                  <label className="block text-sm font-medium mb-1">
                    {meal}
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleMealChange(day, meal, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meal" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEAL_OPTIONS.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Water Intake (glasses)
                </label>
                <Slider
                  min={0}
                  max={8}
                  step={1}
                  value={[waterIntake[day]]}
                  onValueChange={(value) => handleWaterChange(day, value)}
                />
                <span className="text-sm text-muted-foreground">
                  {waterIntake[day]} / 8 glasses
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">Weekly Score</h2>
          <div className="text-3xl font-bold">{calculateScore()} / 100</div>
          <p className="text-sm text-muted-foreground mt-2">
            Based on meal plan completion and water intake
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
