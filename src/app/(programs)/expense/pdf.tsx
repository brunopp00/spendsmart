/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/pdf.js
'use client'

import { Button } from '@/components/ui/button'
import { PDFDocument } from 'pdf-lib'

async function generatePDF(data: any) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()

  // Adicione seu código para criar o conteúdo do PDF usando a biblioteca pdf-lib

  // Exemplo: Adicione texto ao PDF
  const { height } = page.getSize()
  page.drawText('Lista de Gastos:', { x: 50, y: height - 50 })

  // Adicione dados da lista ao PDF
  data.forEach((item: any, index: any) => {
    page.drawText(`${item.name}: R$ ${item.amount.toFixed(2)}`, {
      x: 50,
      y: height - 50 - (index + 1) * 20,
    })
  })

  // Salve o PDF em um Buffer
  const pdfBytes = await pdfDoc.save()

  return pdfBytes
}

function PDFPage({ data }: any) {
  return (
    <div>
      <Button
        onClick={async () => {
          const pdfBytes = await generatePDF(data)

          // Baixe o arquivo PDF
          const blob = new Blob([pdfBytes], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'lista_de_gastos.pdf'
          link.click()
        }}
      >
        Download PDF
      </Button>
    </div>
  )
}

export default PDFPage
