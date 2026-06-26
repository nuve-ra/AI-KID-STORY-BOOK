import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const dbName = await db.execute(sql`SELECT current_database();`);

    const tables = await db.execute(sql`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name = 'storyData';
    `);

    return NextResponse.json({
      dbName,
      tables,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}