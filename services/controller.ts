import { Request, Response } from 'express';
import { serviceService } from './service';
import { IService } from './type';

const { createService, getServices, getServiceByName, editService, deleteService } = serviceService;

class ServiceController {
    async createService(req: Request, res: Response) {
        const { descripcion, nombre, tipo, precio, Image} = req.body;
        try {
        const service: IService = {
            descripcion, nombre, tipo, precio, Image
        };
        const newService = await createService(service);
        res.status(201).json(newService);
        } catch (error: any) {
        res.status(400).json({ message: error.message });
        } 
    }
    
    async getServices(req: Request, res: Response) {
        try {
        const services = await getServices();
        res.status(200).json(services);
        } catch (error: any) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async getService(req: Request, res: Response) {
        const {nombre} = req.params;
        try {
        const service = await getServiceByName(nombre);
        res.status(200).json(service);
        } catch (error:any) {
        res.status(400).json({ message: error.message });
        }
    }
    async getServiceByName(req: Request, res: Response) {
        const name = req.params.name
        try {
        const service = await getServiceByName(name);
        res.status(200).json(service);
        } catch (error:any) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async editService(req: Request, res: Response) {
        const id = req.params.id
        const service: IService = req.body
        console.log(service)
        try {
        const updatedService = await editService(id, service);
        res.status(200).json(updatedService);
        } catch (error:any) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async deleteService(req: Request, res: Response) {
        try {
        await deleteService(req.params.id);
        res.status(200).json({ message: 'Service deleted successfully' });
        } catch (error:any) {
        res.status(400).json({ message: error.message });
        }
    }
}

export const serviceController = new ServiceController();