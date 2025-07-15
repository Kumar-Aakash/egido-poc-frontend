export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  console.log('PDF Proxy: Fetching URL:', url);

  try {
    // Fetch the PDF from the provided URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
        'User-Agent': 'Mozilla/5.0 (compatible; PDF-Proxy/1.0)',
      },
    });

    console.log('PDF Proxy: Response status:', response.status);
    console.log('PDF Proxy: Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('PDF Proxy: Response not ok:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: `Failed to fetch PDF: ${response.statusText}` 
      });
    }

    // Get the PDF data
    const pdfBuffer = await response.arrayBuffer();
    console.log('PDF Proxy: PDF buffer size:', pdfBuffer.byteLength);

    // Set appropriate headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.byteLength);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log('PDF Proxy: Sending PDF data...');
    // Send the PDF data
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error('PDF proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy PDF', details: error.message });
  }
} 