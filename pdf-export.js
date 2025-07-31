document.querySelector('.resume__pdf-btn')?.addEventListener('click', async () => {
    const jsPDF = window.jspdf.jsPDF;
    const resumeContainer = document.querySelector('.resume__container');

    document.body.classList.add('pdf-export-mode');

    // Временно удаляем атрибут contenteditable у всех редактируемых элементов
    resumeContainer.querySelectorAll('[contenteditable]').forEach(el => {
        el.setAttribute('data-editable', 'true');
        el.removeAttribute('contenteditable');
    });

    const controls = document.querySelector('.resume__controls');
    let controlsOriginalDisplay = '';
    if (controls) {
        controlsOriginalDisplay = controls.style.display;
        controls.style.display = 'none';
    }

    const canvas = await html2canvas(resumeContainer, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#ffffff'
    });

    //Генерация PDF из Canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); //  портрет, миллиметры, формат

    // Размеры страницы A4 в мм
    const pdfPageWidth = pdf.internal.pageSize.getWidth();  // 210 мм
    const pdfPageHeight = pdf.internal.pageSize.getHeight(); // 297 мм

    const margin = 10;

    const contentWidth = pdfPageWidth - (margin * 2); // 210 - (10*2) = 190 мм
    const contentHeight = pdfPageHeight - (margin * 2); // 297 - (10*2) = 277 мм

    const imgRatio = canvas.width / canvas.height;
    let imgDisplayWidth = contentWidth;
    let imgDisplayHeight = contentWidth / imgRatio;

    if (imgDisplayHeight > contentHeight) {
        imgDisplayHeight = contentHeight;
        imgDisplayWidth = contentHeight * imgRatio;
    }

    const xOffset = margin + (contentWidth - imgDisplayWidth) / 2;
    const yOffset = margin + (contentHeight - imgDisplayHeight) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgDisplayWidth, imgDisplayHeight);

    pdf.save('resume.pdf');

    setTimeout(() => {
        document.body.classList.remove('pdf-export-mode');

        resumeContainer.querySelectorAll('[data-editable]').forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.removeAttribute('data-editable');
        });

        if (controls) {
            controls.style.display = controlsOriginalDisplay;
        }
    }, 100);
});