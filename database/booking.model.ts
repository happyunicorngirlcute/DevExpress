import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S[^\s@]*@\S[^\s.]*\.\S+$/, 'Please use a valid email address'],
    },
  },
  {
    timestamps: true,
  }
);

// Fix: removed `next`, throw error instead
BookingSchema.pre('save', async function () {
  if (this.isModified('eventId')) {
    const Event = mongoose.model('Event');
    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
      throw new Error('Referenced event does not exist.');
    }
  }
});

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;