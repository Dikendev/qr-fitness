import { Injectable } from '@nestjs/common';
import { QrCodeRepository } from './repository/qr-code-repository';

@Injectable()
export class QrCodeService implements QrCodeRepository {
  constructor() {}

  generateQrCode(data: string): Promise<string> {
    throw new Error(`${data} Method not implemented.`);
  }

  readQrCode(data: string): Promise<string> {
    throw new Error(`${data} Method not implemented.`);
  }
}
