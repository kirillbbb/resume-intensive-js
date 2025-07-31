/* jshint esversion: 11 */
/* global html2canvas:true */
document.addEventListener('DOMContentLoaded', () => {

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

    const initialData = {
        profileIntro: document.querySelector('.profile__intro')?.textContent || '',
        profileName: document.querySelector('.profile__name')?.textContent || '',
        profileTitle: document.querySelector('.profile__title')?.textContent || '',
        languagesTitle: document.querySelector('.languages__title')?.textContent || '',
        languageLabels: Array.from(document.querySelectorAll('.language__label')).map(label => label.textContent),
        languageLevels: Array.from(document.querySelectorAll('.language__bar')).map(bar => bar.getAttribute('data-level') || '0%'),
        experienceTitle: document.querySelector('.experience__title')?.textContent || '',
        experienceDates: Array.from(document.querySelectorAll('.experience__date')).map(date => date.textContent),
        experienceJobs: Array.from(document.querySelectorAll('.experience__job')).map(job => job.textContent),
        experienceDetails: Array.from(document.querySelectorAll('.experience__details')).map(detail => detail.textContent),
        // *** ДОБАВИТЬ ЭТО, ЕСЛИ ВЫ ХОТИТЕ, ЧТОБЫ LI ИЗ ОПЫТА СБРАСЫВАЛИСЬ ***
        // experienceDescriptionLis: Array.from(document.querySelectorAll('.experience__description ul li')).map(li => li.textContent),
        toolsTitle: document.querySelector('.tools__title')?.textContent || '',
        toolsSectionTitles: Array.from(document.querySelectorAll('.tools__section-title')).map(title => title.textContent),
        educationTitle: document.querySelector('.education__title')?.textContent || '',
        educationYears: Array.from(document.querySelectorAll('.education__year')).map(year => year.textContent),
        educationCourses: Array.from(document.querySelectorAll('.education__course')).map(course => course.textContent),
        educationHashtags: Array.from(document.querySelectorAll('.education__hashtag')).map(hashtag => hashtag.textContent),
        educationInstitutions: Array.from(document.querySelectorAll('.education__institution')).map(inst => inst.textContent),
        interestsTitle: document.querySelector('.interests__title')?.textContent || '',
        interestsItems: Array.from(document.querySelectorAll('.interests__item')).map(item => item.textContent),
        contactTitle: document.querySelector('.contact__title')?.textContent || '',
        contactEmail: document.querySelector('.contact__email')?.textContent || ''
    };

    const editableFields = [
        { selector: '.profile__intro', prop: 'profileIntro', type: 'text' },
        { selector: '.profile__name', prop: 'profileName', type: 'text' },
        { selector: '.profile__title', prop: 'profileTitle', type: 'text' },
        { selector: '.languages__title', prop: 'languagesTitle', type: 'text' },
        { selector: '.language__label', prop: 'languageLabels', type: 'arrayText' },
        { selector: '.language__bar', prop: 'languageLevels', type: 'arrayAttr', attr: 'data-level' },
        { selector: '.experience__title', prop: 'experienceTitle', type: 'text' },
        { selector: '.experience__date', prop: 'experienceDates', type: 'arrayText' },
        { selector: '.experience__job', prop: 'experienceJobs', type: 'arrayText' },
        { selector: '.experience__details', prop: 'experienceDetails', type: 'arrayText' },
        { selector: '.tools__title', prop: 'toolsTitle', type: 'text' },
        { selector: '.tools__section-title', prop: 'toolsSectionTitles', type: 'arrayText' },
        { selector: '.education__title', prop: 'educationTitle', type: 'text' },
        { selector: '.education__year', prop: 'educationYears', type: 'arrayText' },
        { selector: '.education__course', prop: 'educationCourses', type: 'arrayText' },
        { selector: '.education__hashtag', prop: 'educationHashtags', type: 'arrayText' },
        { selector: '.education__institution', prop: 'educationInstitutions', type: 'arrayText' },
        { selector: '.interests__title', prop: 'interestsTitle', type: 'text' },
        { selector: '.interests__item', prop: 'interestsItems', type: 'arrayText' },
        { selector: '.contact__title', prop: 'contactTitle', type: 'text' },
        { selector: '.contact__email', prop: 'contactEmail', type: 'text' }
    ];

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('resumeData')) || {};

        editableFields.forEach(field => {
            if (field.type === 'text') {
                const element = document.querySelector(field.selector);
                if (element) {
                    element.textContent = savedData[field.prop] !== undefined ? savedData[field.prop] : initialData[field.prop];
                }
            } else if (field.type === 'arrayText') {
                document.querySelectorAll(field.selector).forEach((el, index) => {
                    el.textContent = savedData[field.prop]?.[index] !== undefined ? savedData[field.prop][index] : initialData[field.prop][index];
                });
            } else if (field.type === 'arrayAttr') {
                document.querySelectorAll(field.selector).forEach((el, index) => {
                    const newValue = savedData[field.prop]?.[index] !== undefined ? savedData[field.prop][index] : initialData[field.prop][index];
                    el.setAttribute(field.attr, newValue);
                    // Обновляем ширину заливки для language bars
                    if (field.selector === '.language__bar') {
                        const fill = el.querySelector('div');
                        if (fill) fill.style.width = newValue;
                    }
                });
            }
        });
    }

    function toggleEditMode(isEditing) {
        const editableElements = [
            document.querySelector('.profile__intro'),
            document.querySelector('.profile__name'),
            document.querySelector('.profile__title'),
            document.querySelector('.languages__title'),
            ...document.querySelectorAll('.language__label'),
            ...document.querySelectorAll('.experience__date'),
            ...document.querySelectorAll('.experience__job'),
            ...document.querySelectorAll('.experience__details'),
            // Если li должны быть редактируемыми:
            ...document.querySelectorAll('.experience__description ul li'),
            document.querySelector('.tools__title'),
            ...document.querySelectorAll('.tools__section-title'),
            document.querySelector('.education__title'),
            ...document.querySelectorAll('.education__year'),
            ...document.querySelectorAll('.education__course'),
            ...document.querySelectorAll('.education__hashtag'),
            ...document.querySelectorAll('.education__institution'),
            document.querySelector('.interests__title'),
            ...document.querySelectorAll('.interests__item'),
            document.querySelector('.contact__title'),
            document.querySelector('.contact__email')
        ].filter(Boolean);

        editableElements.forEach(element => {
            element.setAttribute('contenteditable', isEditing);
            element.classList.toggle('editable', isEditing);
        });

        document.querySelectorAll('.language__bar').forEach(bar => {
            bar.setAttribute('contenteditable', 'false');
            if (isEditing) {
                bar.classList.add('editable');
                const fill = bar.querySelector('div');
                if (fill) fill.style.width = bar.getAttribute('data-level');
            } else {
                bar.classList.remove('editable');
            }
        });
        document.querySelectorAll('.resume__block').forEach(block => {
            block.classList.toggle('editing', isEditing);
        });

        // Обновляем текст кнопки Edit/Save
        const editBtn = document.querySelector('.resume__edit-btn');
        if (editBtn) {
            editBtn.textContent = isEditing ? 'Save' : 'Edit';
        }
    }

    function saveData() {
        const data = {};
        editableFields.forEach(field => {
            if (field.type === 'text') {
                const element = document.querySelector(field.selector);
                data[field.prop] = element ? element.textContent.trim() : '';
            } else if (field.type === 'arrayText') {
                data[field.prop] = Array.from(document.querySelectorAll(field.selector)).map(el => el.textContent.trim());
            } else if (field.type === 'arrayAttr') {
                data[field.prop] = Array.from(document.querySelectorAll(field.selector)).map(el => el.getAttribute(field.attr) || '0%');
            }
        });
        localStorage.setItem('resumeData', JSON.stringify(data));
    }

    function resetData() {
        editableFields.forEach(field => {
            if (field.type === 'text') {
                const element = document.querySelector(field.selector);
                if (element) {
                    element.textContent = initialData[field.prop];
                }
            } else if (field.type === 'arrayText') {
                document.querySelectorAll(field.selector).forEach((el, index) => {
                    el.textContent = initialData[field.prop][index];
                });
            } else if (field.type === 'arrayAttr') {
                document.querySelectorAll(field.selector).forEach((el, index) => {
                    const newValue = initialData[field.prop][index];
                    el.setAttribute(field.attr, newValue);
                    if (field.selector === '.language__bar') {
                        const fill = el.querySelector('div');
                        if (fill) fill.style.width = newValue;
                    }
                });
            }
        });

        localStorage.removeItem('resumeData');

        toggleEditMode(false);
    }

    loadSavedData();

    const editBtn = document.querySelector('.resume__edit-btn');
    const resetBtn = document.querySelector('.resume__reset-btn');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const isEditing = editBtn.textContent === 'Edit';
            toggleEditMode(isEditing);
            if (!isEditing) saveData();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetData);
    }

    document.addEventListener('blur', (event) => {
        if (event.target.closest('.editable') && event.target.getAttribute('contenteditable') === 'true') {
            saveData();
        }
    }, true);

    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && event.target.closest('.editable') && event.target.getAttribute('contenteditable') === 'true') {
            event.preventDefault();
            event.target.blur();
        }
    });

    document.addEventListener('click', (event) => {
        const bar = event.target.closest('.language__bar');
        if (bar && bar.classList.contains('editable')) {
            const rect = bar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const widthPercent = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
            const newLevel = Math.round(widthPercent) + '%';
            const fill = bar.querySelector('div');
            if (fill) fill.style.width = newLevel;
            bar.setAttribute('data-level', newLevel);
            saveData();
        }
    });
});