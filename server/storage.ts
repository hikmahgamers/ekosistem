import { db } from "./db";
import { lessons, type Lesson } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  insertLesson(lesson: Omit<Lesson, "id">): Promise<Lesson>;
}

export class DatabaseStorage implements IStorage {
  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.order);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async insertLesson(lesson: Omit<Lesson, "id">): Promise<Lesson> {
    const [newLesson] = await db.insert(lessons).values(lesson).returning();
    return newLesson;
  }
}

export const storage = new DatabaseStorage();
