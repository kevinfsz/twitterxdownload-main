export async function GET() {
  try {
    const response = await fetch('https://api.twitterxdownload.com/api/remains', {
      method: 'GET',
      next: { revalidate: 60 } // 缓存60秒
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    return Response.json({ 
      success: true,
      data: data.data
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// 移除 force-dynamic 以允许缓存
// export const dynamic = 'force-dynamic';