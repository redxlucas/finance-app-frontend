import api from "@/services/api";

export async function getAllCategories() {
    const response = await api.get("/api/categories/all");
    return response.data;
}
