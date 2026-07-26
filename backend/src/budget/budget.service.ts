import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import * as PDFDocument from 'pdfkit'; // standard PDFkit library
import * as QRCode from 'qrcode'; // QR Code generator library

@Injectable()
export class BudgetService {
  private readonly logger = new Logger(BudgetService.name);

  constructor(private readonly storageService: StorageService) {}

  /**
   * Generates a dynamic printable PDF document for a lead's cotação
   * and uploads it to Cloudflare R2, returning the secure R2 URL.
   */
  async generateBudgetPdf(leadData: any, sellerData: any): Promise<string> {
    this.logger.log(`Initializing professional PDF generation for Lead ${leadData.name}...`);

    return new Promise(async (resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 40 });
        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', async () => {
          const pdfBuffer = Buffer.concat(buffers);
          const fileName = `orcamentos/orcamento-${leadData.id}-${Date.now()}.pdf`;
          
          // Upload Buffer to Cloudflare R2
          const fileUrl = await this.storageService.uploadFile(
            pdfBuffer,
            fileName,
            'application/pdf'
          );
          resolve(fileUrl);
        });

        // 1. TIMBRED HEADER
        doc.fillColor('#3E2723').font('Helvetica-Bold').fontSize(22).text('SÓ MADEIRAS', 40, 40);
        doc.fillColor('#FFC107').font('Helvetica-Bold').fontSize(8).text('MATERIAL DE CONSTRUÇÃO E MADEIRAS NOBRES', 40, 62);
        
        doc.fillColor('#666666').font('Helvetica').fontSize(8)
           .text('Av. das Palmeiras, 1500 - Campinas/SP', 40, 78)
           .text('CNPJ: 00.000.000/0001-00 | Fone: (19) 3999-9999', 40, 88);

        // Document Number Right Align
        doc.fillColor('#3E2723').font('Helvetica-Bold').fontSize(14).text(`ORÇAMENTO #${leadData.id.slice(-7).toUpperCase()}`, 380, 40, { align: 'right' });
        doc.fillColor('#666666').font('Helvetica').fontSize(8)
           .text(`Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 380, 58, { align: 'right' })
           .text(`Vendedor: ${sellerData.name}`, 380, 68, { align: 'right' });

        // Accent divider
        doc.strokeColor('#FFC107').lineWidth(3).moveTo(40, 105).lineTo(555, 105).stroke();

        // 2. CLIENT INFO BOX
        doc.fillColor('#f8f9fa').rect(40, 115, 515, 60).fill();
        doc.fillColor('#3E2723').font('Helvetica-Bold').fontSize(9).text('DADOS DO COMPRADOR', 50, 122);
        
        doc.fillColor('#333333').font('Helvetica').fontSize(9)
           .text(`Cliente: ${leadData.name}`, 50, 137)
           .text(`WhatsApp: ${leadData.phone} | Local: ${leadData.location}`, 50, 149);

        // 3. TABLE HEADERS
        doc.fillColor('#333333').font('Helvetica-Bold').fontSize(8).text('DESCRIÇÃO DO MATERIAL', 45, 195);
        doc.text('QTD', 320, 195, { width: 30, align: 'center' });
        doc.text('UNITÁRIO', 380, 195, { width: 60, align: 'right' });
        doc.text('VALOR TOTAL', 475, 195, { width: 80, align: 'right' });
        
        doc.strokeColor('#cccccc').lineWidth(1).moveTo(40, 208).lineTo(555, 208).stroke();

        // 4. LOOP PRODUCTS LISTING
        let currentY = 218;
        leadData.products.forEach((prodStr: string) => {
          const split = prodStr.split(' x ');
          const name = split[0];
          const qty = parseInt(split[1] || '1');
          const unitPrice = leadData.total / qty;
          const totalItem = unitPrice * qty;

          doc.fillColor('#444444').font('Helvetica').fontSize(9).text(name, 45, currentY);
          doc.font('Helvetica-Bold').text(qty.toString(), 320, currentY, { width: 30, align: 'center' });
          doc.font('Helvetica').text(`R$ ${unitPrice.toFixed(2)}`, 380, currentY, { width: 60, align: 'right' });
          doc.font('Helvetica-Bold').text(`R$ ${totalItem.toFixed(2)}`, 475, currentY, { width: 80, align: 'right' });

          currentY += 18;
        });

        doc.strokeColor('#cccccc').lineWidth(1).moveTo(40, currentY + 5).lineTo(555, currentY + 5).stroke();

        // 5. QR CODE GENERATION & TOTALS
        const waText = `Olá! Tenho interesse no orçamento formal #${leadData.id.slice(-7).toUpperCase()}`;
        const waUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(waText)}`;
        
        // Generate raw QR Code DataURL base64
        const qrCodeDataUrl = await QRCode.toDataURL(waUrl, { width: 80, margin: 1 });
        const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
        const qrBuffer = Buffer.from(base64Data, 'base64');

        // Draw QR Code
        doc.image(qrBuffer, 40, currentY + 15, { width: 70 });
        doc.fillColor('#666666').font('Helvetica').fontSize(7)
           .text('Escaneie este QR Code', 120, currentY + 30)
           .text('para tirar dúvidas ou agendar', 120, currentY + 40)
           .text('a entrega via WhatsApp.', 120, currentY + 50);

        // Calculations Right Align
        const subtotal = leadData.total / 0.9;
        const discount = leadData.total * 0.1;
        const totalPix = leadData.total;

        doc.fillColor('#666666').font('Helvetica').fontSize(9).text('Subtotal de Tabela:', 360, currentY + 15, { width: 100, align: 'right' });
        doc.font('Helvetica-Bold').text(`R$ ${subtotal.toFixed(2)}`, 470, currentY + 15, { width: 85, align: 'right' });

        doc.fillColor('#16a34a').font('Helvetica').fontSize(9).text('Desconto Pix (10%):', 360, currentY + 30, { width: 100, align: 'right' });
        doc.font('Helvetica-Bold').text(`- R$ ${discount.toFixed(2)}`, 470, currentY + 30, { width: 85, align: 'right' });

        doc.fillColor('#3E2723').font('Helvetica-Bold').fontSize(11).text('TOTAL A PAGAR PIX:', 340, currentY + 48, { width: 120, align: 'right' });
        doc.fontSize(12).text(`R$ ${totalPix.toFixed(2)}`, 470, currentY + 48, { width: 85, align: 'right' });

        // 6. TERMS
        doc.fillColor('#999999').font('Helvetica-Oblique').fontSize(7)
           .text('Orçamento válido por 5 dias consecutivos. Madeiras nativas reguladas pelo IBAMA/DOF.', 40, 750, { align: 'center' });

        doc.end();
      } catch (err) {
        this.logger.error(`Failed to generate budget PDF: ${err.message}`);
        reject(err);
      }
    });
  }
}
