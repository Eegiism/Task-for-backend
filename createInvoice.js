const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("beeanco-logo.png", 250, 50, { width: 90 })
    .moveDown(1.5);
}

function generateCustomerInformation(doc, invoice) {
    const d = new Date();
    doc.fontSize(22)
    doc.text(`Danke ${invoice.order.buyer.firstName}`, {
        width: 410,
        align: 'left'
      }
      );

    doc.moveDown(0.4);
    doc.fontSize(22)
    doc.text("für deine Bestellung!", {
    width: 210,
    align: 'left'
    }
    );

    doc.moveDown(0.7);
    doc.fontSize(14)
    

    

    doc.text("Hiermit bestätigen wir deine Bestellung bei beeanco. Bitte überprüfe noch einmal unten aufgelistet deine bestellten Artikel und deine angegebene Lieferadresse. ", {
    width: 420,
    align: 'left'
    }
    ); 

    doc.moveDown();

    const customerInformationTop = 300;

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text("Angegebene Lieferadresse:", 50, customerInformationTop)
    .font('Helvetica')
    .text(invoice.order.shippingAddress.name, 50, customerInformationTop + 15)
    .text(invoice.order.shippingAddress.address1, 50, customerInformationTop + 30)

    .text(
        invoice.order.shippingAddress.countryCode +
          ", " +
          invoice.order.shippingAddress.zip +
          ", " +
          invoice.order.shippingAddress.city, 50, customerInformationTop + 45
      )

      .fontSize(10)
      .font('Helvetica-Bold')
      .text("Angegebene Rechnungsadresse:", 225, customerInformationTop)
      .font('Helvetica')
      .text(invoice.order.shippingAddress.name, 225, customerInformationTop + 15)
      .text(invoice.order.shippingAddress.address1, 225, customerInformationTop + 30)
  
      .text(
          invoice.order.shippingAddress.countryCode +
            ", " +
            invoice.order.shippingAddress.zip +
            ", " +
            invoice.order.shippingAddress.city, 225, customerInformationTop + 45
        )
       
        .fontSize(10)
        .font('Helvetica-Bold')
        .text(`Invoice Nummer : ${invoice.order.id}`, 400, customerInformationTop)
        .font('Helvetica')
        .text(`Invoice Date : ${formatDate(d)}`, 400, customerInformationTop + 15)
        .text("Terms : 30 days", 400, customerInformationTop + 30)
    
    
    .moveDown(); 

}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 390;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Bestellter Artikel",
    "Artikel Nummber",
    "Preis",
    "Menge",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  let totalPrice = 0;
  for (i = 0; i < invoice.order.items.length; i++) {
    const item = invoice.order.items[i];

    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.product.name,
      item.product.sku,
      formatCurrency(item.price),
      item.quantity,
      calculateLineTotal(item.quantity, item.price),
      totalPrice = totalPrice + (item.quantity * item.price)
    );

    generateHr(doc, position + 20);
  }

  const totalPosition = invoiceTableTop + (i + 1) * 35;
  doc.font("Helvetica-Bold");
  doc.fontSize(20)
  generateTableRow(
    doc,
    totalPosition,
    "",
    "",
    "",
    "Total : ",
    formatCurrency(totalPrice)
  );

}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 200, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return (cents).toFixed(2) + "€";
}

function calculateLineTotal(quantity, preis) {
    return (quantity * preis).toFixed(2) + "€";
  }

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
