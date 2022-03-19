import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '../..', 'productImages')
            fs.access(filePath, fs.constants.F_OK, () => {
                fs.mkdir(filePath, {recursive: true}, () => {
                    fs.writeFile(path.join(filePath, fileName), file.buffer, () => {})
                })
            })
            return fileName;
            
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}