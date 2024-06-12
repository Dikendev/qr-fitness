export abstract class QrCodeRepository {
  abstract generateQrCode(data: string): Promise<string>;
  abstract readQrCode(data: string): Promise<string>;
}
