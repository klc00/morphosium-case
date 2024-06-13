export interface LogServiceInterface {
  logGeneral(message: string, context?: string): void;
  logUpload(message: string, context?: string): void;
  logError(message: string, context?: string): void;
  getUploadLogs(limit: number, offset: number): string[];
}
