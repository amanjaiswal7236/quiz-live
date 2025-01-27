import { useFormContext } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

type QuestionFormProps = {
  type: string
  onSave: () => void
  onBack: () => void
}

export default function QuestionForm({ type, onSave, onBack }: QuestionFormProps) {
  const { register, handleSubmit, watch } = useFormContext()

  const onSubmit = (data: any) => {
    console.log('Question data:', data)
    onSave()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add {type} Question</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              {...register('currentQuestion.question', { required: true })}
              placeholder="Enter your question"
              className="mt-1"
            />
          </div>

          {type === 'Buttons' && (
            <div className="space-y-4">
              <Label>Options</Label>
              <RadioGroup className="space-y-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center space-x-2">
                    <RadioGroupItem value={`option-${num}`} id={`option-${num}`} />
                    <Input
                      {...register(`currentQuestion.options.${num - 1}`, { required: true })}
                      placeholder={`Option ${num}`}
                      className="flex-1"
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Save Question</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}