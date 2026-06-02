import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Event } from '@/database';

/**
 * GET /api/events/[slug]
 * Fetches event details by its unique slug.
 * 
 * @param request - The incoming Next.js request object.
 * @param context - The dynamic route parameters.
 * @returns A JSON response with the event data or an error message.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 1. Validate the slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid slug is required.' },
        { status: 400 }
      );
    }

    // 2. Ensure database connection
    await connectToDatabase();

    // 3. Query the Event model
    // Using lean() for better performance as we only need the plain object
    const event = await Event.findOne({ slug }).lean();

    // 4. Handle Case: Event not found
    if (!event) {
      return NextResponse.json(
        { success: false, error: `Event with slug '${slug}' not found.` },
        { status: 404 }
      );
    }

    // 5. Success Response
    return NextResponse.json(
      { success: true, data: event },
      { status: 200 }
    );

  } catch (error: unknown) {
    // 6. Global Error Handling
    console.error('[EVENT_GET_BY_SLUG_ERROR]:', error);

    // Differentiate between Mongoose/Database errors and generic server errors
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
}
