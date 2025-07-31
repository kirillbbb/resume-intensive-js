document.querySelectorAll('.language__bar').forEach(bar => {
    const level = bar.dataset.level;

    const fill = document.createElement('div');
    fill.style.width = level;
    fill.style.height = '100%';
    fill.style.backgroundColor = '#20dc64';
    fill.style.borderRadius = '6px';
    fill.style.transition = 'width 0.5s ease-in-out';

    bar.appendChild(fill);
});