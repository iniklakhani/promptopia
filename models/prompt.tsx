import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, 'Please provide a prompt.'],
  },
  tag: {
    type: String,
    required: [true, 'Please provide a tag.'],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt
