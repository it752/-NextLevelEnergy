import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = await request.json();
    const { event_name, event_id, event_source_url, fbp, fbc } = body;

    const PIXEL_ID = '1468535111329752';
    // Pobieranie tokenu z opcjonalnego import.meta.env lub process.env
    const ACCESS_TOKEN = import.meta.env.META_PIXEL_TOKEN || process.env.META_PIXEL_TOKEN;

    if (!ACCESS_TOKEN) {
      console.warn("Meta Pixel Token (META_PIXEL_TOKEN) is missing in environment variables.");
      return new Response(JSON.stringify({ success: false, error: 'Token missing' }), { status: 500 });
    }

    const clientIp = request.headers.get('x-forwarded-for') || clientAddress;
    const userAgent = request.headers.get('user-agent') || '';

    const eventParams = {
      data: [
        {
          event_name: event_name || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: event_id,
          event_source_url: event_source_url,
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            ...(fbp ? { fbp } : {}),
            ...(fbc ? { fbc } : {})
          }
        }
      ]
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventParams)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Meta CAPI Error Response:", result);
    }

    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error("CAPI Internal Error:", error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), { status: 500 });
  }
};
