import { IService} from "./type";
import Service from "./model";

class ServiceDao {
    async getServiceByName(name: string) {
        try {
            const service = await Service.findOne({ name });
            return service;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    
    async getAllServices() {
        try {
            const services = await Service.find();
            return services;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async createService(service: Partial<IService>) {
        try {
            const newService = await Service.create(service);
            return newService;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async editService(id: string, service: IService) {
        try {
            const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
            return updatedService;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async deleteService(serviceId: string) {
        try {
            const deletedService = await Service.findByIdAndDelete(serviceId);
            return deletedService;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
}

export const serviceDao = new ServiceDao();