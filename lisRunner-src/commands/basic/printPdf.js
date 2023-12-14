import html2pdf from "html2pdf.js";

export default function generatePDF(pid, fileName, options) {
    
    const Porientation = options?.orientation == undefined ? "p" : options.orientation;
    const Pformat = options?.format == undefined ? "a4" : options.format;
    const Punit = options?.unit == undefined ? "mm" : options.unit;
    const Pmargin = options?.margin == undefined ? 0.3 : options.margin;

    const page = document.getElementById(pid);

    try {
        html2pdf()
            .set({
                margin: [5, 5, 15, 5],
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
                jsPDF: { unit: Punit, format: Pformat, orientation: Porientation },
                pagebreak: { after: '#page_break', before: '#page_break_before' }
            }).from(page)
            .toPdf().get('pdf').then(function (pdf) {
                var totalPages = pdf.internal.getNumberOfPages();

                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(8);
                    pdf.setTextColor(150);
                    //pdf.text(15, 15, '<p>yazım</p>');
                    pdf.setTextColor(150);
                    pdf.text(localStorage.lis_user + "    " + new Date().toLocaleString() + "            " + i + '/' + totalPages + '', pdf.internal.pageSize.getWidth() - 85, pdf.internal.pageSize.getHeight() - 8);
                }
            }).save().catch((err) => { console.log(err); });
    } catch (error) {
        this.alert("e", error.message);
    }
}