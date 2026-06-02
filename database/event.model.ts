import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Interface representing an Event document in MongoDB.
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: [true, 'Description is required'] },
    overview: { type: String, required: [true, 'Overview is required'] },
    image: { type: String, required: [true, 'Image URL is required'] },
    venue: { type: String, required: [true, 'Venue is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    date: { type: String, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    mode: { type: String, required: [true, 'Mode is required'] },
    audience: { type: String, required: [true, 'Audience is required'] },
    agenda: { type: [String], required: [true, 'Agenda is required'] },
    organizer: { type: String, required: [true, 'Organizer is required'] },
    tags: { type: [String], required: [true, 'Tags are required'] },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to generate slug and normalize date/time.
 */
EventSchema.pre('save', async function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  if (this.isModified('date')) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format provided.');
    }
    this.date = parsedDate.toISOString();
  }

  if (this.isModified('time')) {
    this.time = this.time.trim().toLowerCase();
  }
});

const Event: Model<IEvent> = (mongoose.models.Event as Model<IEvent>) || mongoose.model<IEvent>('Event', EventSchema);

export default Event;