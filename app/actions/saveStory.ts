'use server';

import { v4 as uuidv4 } from 'uuid';

import { db } from '@/config/db';
import { StoryData } from '@/config/schema';

export const saveStoryToDB = async (
  formData: any,
  output: string,
  userEmail: string,
) => {
  try {
    const recordId = uuidv4();

    console.log("User Email:", userEmail);

    const parsedOutput = JSON.parse(output);

    console.log("Parsed Output:", parsedOutput);

    const result = await db
      .insert(StoryData)
      .values({
        storyId: recordId,
        ageGroup: formData?.ageGroup ?? '',
        storyType: formData?.storyType ?? '',
        storySubject: formData?.storySubject ?? '',
        imageStyle: formData?.imageStyle ?? '',
        output: parsedOutput,
        coverImage: parsedOutput.coverImage,
        userEmail,
      })
      .returning({
        storyId: StoryData.storyId,
      });

    return result;
  } catch (error) {
    console.error("SAVE STORY ERROR:", error);
    throw error;
  }
};