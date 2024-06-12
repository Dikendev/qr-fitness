import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeRepository } from './repository/qr-code-repository';

@Module({
  providers: [
    QrCodeService,
    { provide: QrCodeRepository, useClass: QrCodeService },
  ],
  exports: [QrCodeRepository],
})
export class QrCodeModule {}
