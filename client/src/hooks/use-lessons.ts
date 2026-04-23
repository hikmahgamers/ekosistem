import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod Validation Error] ${label}:`, result.error.format());
    throw new Error(`Data validation failed for ${label}`);
  }
  return result.data;
}

export function useLessons() {
  return useQuery({
    queryKey: [api.lessons.list.path],
    queryFn: async () => {
      const res = await fetch(api.lessons.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Gagal mengambil data pelajaran");
      
      const data = await res.json();
      return parseWithLogging<typeof api.lessons.list.responses[200]["_type"]>(
        api.lessons.list.responses[200], 
        data, 
        "lessons.list"
      );
    },
  });
}

export function useLesson(id: number) {
  return useQuery({
    queryKey: [api.lessons.get.path, id],
    queryFn: async () => {
      if (isNaN(id)) throw new Error("ID Pelajaran tidak valid");
      
      const url = buildUrl(api.lessons.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Gagal mengambil detail pelajaran");
      
      const data = await res.json();
      return parseWithLogging<typeof api.lessons.get.responses[200]["_type"]>(
        api.lessons.get.responses[200], 
        data, 
        "lessons.get"
      );
    },
    enabled: !isNaN(id),
  });
}
