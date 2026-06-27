
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // const formData = new FormData();

    // formData.append('prompt', prompt);
    // formData.append('output_format', 'webp');
    // formData.append('aspect_ratio', '1:1');
    // formData.append('output_quality', '60');

    // Replace lines 90-102 with:
const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
  prompt
)}?width=1024&height=1024&seed=${Date.now()}`;
const response = await fetch(pollinationsUrl);

if (!response.ok) {
  const errorText = await response.text();
  return NextResponse.json(
    {
      error: `Pollinations AI Error: ${response.status} - ${errorText}`,
    },
    { status: response.status },
  );
}

    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `story-cover-${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filepath = join(
      process.cwd(),
      'public',
      'generated-images',
      filename,
    );

    await mkdir(dirname(filepath), { recursive: true });
    await writeFile(filepath, buffer);

    const imageUrl = `/generated-images/${filename}`;

    return NextResponse.json({
      imageUrl,
      success: true,
      size: imageBlob.size,
      filename,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Internal server error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      },
      { status: 500 },
    );
  }
}
