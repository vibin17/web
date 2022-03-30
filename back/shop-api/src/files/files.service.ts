import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    private validExtensions = ['.webp', '.png', '.jpg', 'jpeg']
    private validMimeTypes = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg']
    async createFile(file): Promise<string> {
        const extension = path.extname(file.originalname)
        const mimeType = file.mimetype
        if (!(this.validExtensions.includes(extension) &&
            this.validMimeTypes.includes(mimeType))) {
                throw new HttpException('Некоректный формат файла', HttpStatus.BAD_REQUEST)
        }

        try {
            const fileName = uuid.v4() + extension
            const filePath = path.resolve(__dirname, '../..', 'product-images')

            await fs.promises.access(filePath)
            await fs.promises.mkdir(filePath, { recursive: true })
            await fs.promises.writeFile(path.join(filePath, fileName), file.buffer)

            return fileName;  
        } 
        
        catch {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async deleteFile(fileName: string) {
        try {
            const filePath = path.resolve(__dirname, '../..', 'product-images')
            await fs.promises.rm(path.join(filePath, fileName))

            return path.join(filePath, fileName);
        }
        catch {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readFile(fileName: string) {
        try {
            const filePath = path.join(path.resolve(__dirname, '../..', 'product-images'), fileName)
            let fileData = await fs.promises.readFile(filePath)
            return fileData
            
        } catch {
            throw new HttpException('Произошла ошибка при чтении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}