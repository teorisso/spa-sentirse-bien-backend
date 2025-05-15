import { IService } from "./type";
import { serviceDao } from "./dao";

const { getServiceByName, getAllServices, createService, editService, deleteService } = serviceDao;

class ServiceService {
    async getServiceByName(name: string) {
        try {
            const service = await getServiceByName(name);
            return service;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async getServices() {
        try {
            const services = await getAllServices();
            return services;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async createService(service: IService) {
        try {
            const newService = await createService(service);
            return newService;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async editService(id: string, service: IService) {
        try {
            const editedService = await editService(id, service);
            return editedService;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async deleteService(id: string) {
        try {
            const deletedService = await deleteService(id);
            return deletedService;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
}

export const serviceService = new ServiceService();