import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const seedData = [
  {
    title: "Ekosistem Hutan Hujan Tropis",
    summary: "Kenali kekayaan flora dan fauna di paru-paru dunia.",
    content: "Hutan hujan tropis adalah bioma dengan keanekaragaman hayati tertinggi di bumi. Ekosistem ini menerima curah hujan yang tinggi sepanjang tahun. Di sini terdapat berbagai lapisan kanopi yang menjadi habitat bagi ribuan spesies tumbuhan dan hewan, mulai dari pohon raksasa, liana, anggrek, hingga berbagai serangga, burung, dan mamalia besar. Keberadaan hutan hujan tropis sangat penting dalam menjaga keseimbangan iklim global.",
    category: "Ekosistem Darat",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop",
    order: 1
  },
  {
    title: "Ekosistem Sabana",
    summary: "Padang rumput luas dengan sedikit pohon, tempat singgah mamalia besar.",
    content: "Sabana adalah padang rumput yang diselingi oleh pohon-pohon yang tumbuh menyebar. Ekosistem ini memiliki musim kemarau yang panjang dan musim hujan yang pendek. Fauna yang umum ditemukan di sabana antara lain gajah, singa, jerapah, dan zebra. Api liar juga sering terjadi secara alami di sabana yang ternyata berperan penting dalam regenerasi tanaman.",
    category: "Ekosistem Darat",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7fc2caa62261?q=80&w=1000&auto=format&fit=crop",
    order: 2
  },
  {
    title: "Ekosistem Laut",
    summary: "Dunia bawah laut yang penuh misteri dan keindahan.",
    content: "Ekosistem laut mencakup samudera luas, terumbu karang, dan estuari. Lautan menutupi lebih dari 70% permukaan bumi dan menyimpan kekayaan kehidupan mulai dari plankton mikroskopis hingga paus biru yang merupakan hewan terbesar di bumi. Terumbu karang juga merupakan salah satu ekosistem paling produktif dan berharga di perairan laut.",
    category: "Ekosistem Air",
    imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1000&auto=format&fit=crop",
    order: 3
  },
  {
    title: "Ekosistem Air Tawar (Danau & Sungai)",
    summary: "Sumber kehidupan yang mengalirkan air jernih ke seluruh daratan.",
    content: "Ekosistem air tawar meliputi danau, sungai, dan rawa. Walaupun hanya mencakup sebagian kecil dari seluruh air di bumi, ekosistem ini sangat penting bagi kehidupan manusia dan berbagai spesies ikan, amfibi, serta tumbuhan air. Aliran sungai membawa nutrisi penting dan mendukung kehidupan peradaban di sekitarnya.",
    category: "Ekosistem Air",
    imageUrl: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=1000&auto=format&fit=crop",
    order: 4
  }
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.lessons.list.path, async (req, res) => {
    try {
      const lessons = await storage.getLessons();
      res.json(lessons);
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.lessons.get.path, async (req, res) => {
    try {
      const lesson = await storage.getLesson(Number(req.params.id));
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.json(lesson);
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed database
  try {
    const existingLessons = await storage.getLessons();
    if (existingLessons.length === 0) {
      console.log("Seeding database with lessons...");
      for (const lesson of seedData) {
        await storage.insertLesson(lesson);
      }
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }

  return httpServer;
}
