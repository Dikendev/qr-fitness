import { QrCodeRepository } from '../../external/qr-code/repository/qr-code-repository';

export class QrCodeController {
  constructor(private readonly qrCodeRepository: QrCodeRepository) {}

  async readQrCode(): Promise<any> {
    return this.qrCodeRepository.readQrCode('data');
  }
}
