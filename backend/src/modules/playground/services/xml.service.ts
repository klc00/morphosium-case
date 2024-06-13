import { BadRequestException, Injectable } from '@nestjs/common';
import { extname } from 'path';
import * as ExcelJS from 'exceljs';
import { XMLServiceInterface } from '../interfaces/xml.service.interface';

@Injectable()
export class XMLService implements XMLServiceInterface {
  public checkExtension(file: Express.Multer.File): void {
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExt = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt))
      throw new BadRequestException(
        'Invalid file format. Only xlsx or xls files are allowed.',
      );
  }

  public async parseXmlFile(file: Express.Multer.File): Promise<any[]> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer);
      const worksheet = workbook.getWorksheet(1);

      const suppliers: any[] = [];
      const headers: string[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          row.eachCell((cell) => {
            headers.push(cell.value as string);
          });
        } else {
          const supplier: any = {};
          row.eachCell((cell, colNumber) => {
            if (headers[colNumber - 1] !== undefined) {
              supplier[headers[colNumber - 1]] = cell.value;
            }
          });
          suppliers.push(supplier);
        }
      });

      return suppliers;
    } catch (err) {
      throw new BadRequestException('Error parsing file');
    }
  }
}
