import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  user_id: { type: String, default: null },
  check_id: { type: String, unique: true },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  created_at: { type: Date, default: null }
})

reportSchema.pre('save', function(this: any, next: any) {
  const now = new Date()
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

export default mongoose.model('Report', reportSchema)
