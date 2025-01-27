import { useFormContext } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

type QuizDetailsProps = {
  onNext: () => void
}

export default function QuizDetails({ onNext }: QuizDetailsProps) {
  const { register, handleSubmit, formState: { errors } } = useFormContext()

  const onSubmit = (data: any) => {
    console.log('Quiz details:', data)
    onNext()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter quiz title"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message as string}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              placeholder="Enter quiz description"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                {...register('timeLimit', { required: 'Time limit is required', min: 1 })}
                placeholder="Enter time limit"
              />
              {errors.timeLimit && (
                <p className="text-sm text-red-500 mt-1">{errors.timeLimit.message as string}</p>
              )}
            </div>

            <div>
              <Label htmlFor="pointsPerQuestion">Points per Question</Label>
              <Input
                id="pointsPerQuestion"
                type="number"
                {...register('pointsPerQuestion', { required: 'Points are required', min: 1 })}
                placeholder="Enter points"
              />
              {errors.pointsPerQuestion && (
                <p className="text-sm text-red-500 mt-1">{errors.pointsPerQuestion.message as string}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Next: Add Questions</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

