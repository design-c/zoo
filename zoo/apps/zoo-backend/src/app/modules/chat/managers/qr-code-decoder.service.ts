import { Injectable } from '@nestjs/common';
import { BarcodeFormat, BinaryBitmap, DecodeHintType, HybridBinarizer, MultiFormatReader, RGBLuminanceSource } from '@zxing/library';
import sharp from 'sharp';

@Injectable()
export class QrCodeDecoderService {
    private readonly reader: MultiFormatReader;

    constructor() {
        this.reader = new MultiFormatReader();
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
        this.reader.setHints(hints);
    }

    public async decodeQRCode(base64Image: string): Promise<string | null> {
        try {
            const buffer = Buffer.from(base64Image, 'base64');
            const { data, info } = await sharp(buffer)
                .greyscale()
                .raw()
                .toBuffer({ resolveWithObject: true });
            const uint8ClampedArray = new Uint8ClampedArray(data.buffer);
            const luminanceSource = new RGBLuminanceSource(uint8ClampedArray, info.width, info.height);
            const binaryBitmap: BinaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

            const result = this.reader.decode(binaryBitmap);

            return result.getText();
        }
        catch {
            return null;
        }
    }
}
