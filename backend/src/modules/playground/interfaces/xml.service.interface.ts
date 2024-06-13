export interface XMLServiceInterface {
  checkExtension(file: Express.Multer.File): void;
  parseXmlFile(file: Express.Multer.File): Promise<any[]>;
}
