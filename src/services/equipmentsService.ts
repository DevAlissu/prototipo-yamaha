import api from "./api"; 

// Função para listar todos os equipamentos
export const getEquipments = async () => {
  try {
    const response = await api.get("/equipaments/");  
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar equipamentos:", error);
    throw error;
  }
};

// Função para criar um novo equipamento
export const createEquipment = async (data: any) => {
  try {
    const response = await api.post("/equipaments/", data);  
    return response.data;
  } catch (error) {
    console.error("Erro ao criar equipamento:", error);
    throw error;
  }
};

// Função para editar um equipamento
export const updateEquipment = async (id: number, data: any) => {
  try {
    const response = await api.put(`/equipaments/${id}/`, data); 
    return response.data;
  } catch (error) {
    console.error("Erro ao editar equipamento:", error);
    throw error;
  }
};

// Função para excluir um equipamento
export const deleteEquipment = async (id: number) => {
  try {
    await api.delete(`/equipaments/${id}/`);  
  } catch (error) {
    console.error("Erro ao excluir equipamento:", error);
    throw error;
  }
};