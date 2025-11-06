import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/submit
 * Handles form submission and triggers Zapier webhook
 */

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.organization || !data.zipCode || !data.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Zapier webhook URL (should be set in environment variables)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!zapierWebhookUrl) {
      console.warn('Zapier webhook URL not configured');
      // In development, still return success but log warning
      if (process.env.NODE_ENV === 'development') {
        console.log('Form submission data:', data);
        return NextResponse.json({ success: true, message: 'Development mode - no webhook sent' });
      }
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    // Send data to Zapier webhook
    const webhookResponse = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        organization: data.organization,
        phone: data.phone || '',
        zipCode: data.zipCode,
        role: data.role,
        demographics: data.demographics,
        submissionDate: data.submissionDate,
        tool: 'Language Demographics Assessment',
        source: 'Language Demographics Tool',
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error('Zapier webhook request failed');
    }

    // Log successful submission
    console.log(`Lead captured: ${data.email} from ${data.organization} (ZIP: ${data.zipCode})`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Report sent successfully',
    });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}

// Disable CORS for this endpoint if needed
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
