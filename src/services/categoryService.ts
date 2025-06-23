import api from "@/services/api";

export async function getAllCategories() {
    const response = await api.get("/api/categories");
    return response.data;
}

export async function getCategoriesByType(type: string) {
    const response = await api.get(`/api/categories/${type.toLowerCase()}`);
    return response.data;
}
