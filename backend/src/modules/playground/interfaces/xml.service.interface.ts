export interface XMLServiceInterface {
  checkExtension(file: Express.Multer.File): boolean;
  parseXmlFile(file: Express.Multer.File): Promise<any[] | null>;
}
