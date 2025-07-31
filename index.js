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

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('resumeData')) || {};
        if (savedData.profileIntro !== undefined) document.querySelector('.profile__intro').textContent = savedData.profileIntro;
        if (savedData.profileName !== undefined) document.querySelector('.profile__name').textContent = savedData.profileName;
        if (savedData.profileTitle !== undefined) document.querySelector('.profile__title').textContent = savedData.profileTitle;
        if (savedData.languagesTitle !== undefined) document.querySelector('.languages__title').textContent = savedData.languagesTitle;
        if (savedData.languageLabels) {
            document.querySelectorAll('.language__label').forEach((label, index) => {
                label.textContent = savedData.languageLabels[index] !== undefined ? savedData.languageLabels[index] : initialData.languageLabels[index];
            });
        }
        if (savedData.languageLevels) {
            document.querySelectorAll('.language__bar').forEach((bar, index) => {
                const newLevel = savedData.languageLevels[index] !== undefined ? savedData.languageLevels[index] : initialData.languageLevels[index];
                bar.setAttribute('data-level', newLevel);
                const fill = bar.querySelector('div');
                if (fill) fill.style.width = newLevel;
            });
        }
        if (savedData.experienceTitle !== undefined) document.querySelector('.experience__title').textContent = savedData.experienceTitle;
        if (savedData.experienceDates) {
            document.querySelectorAll('.experience__date').forEach((date, index) => {
                date.textContent = savedData.experienceDates[index] !== undefined ? savedData.experienceDates[index] : initialData.experienceDates[index];
            });
        }
        if (savedData.experienceJobs) {
            document.querySelectorAll('.experience__job').forEach((job, index) => {
                job.textContent = savedData.experienceJobs[index] !== undefined ? savedData.experienceJobs[index] : initialData.experienceJobs[index];
            });
        }
        if (savedData.experienceDetails) {
            document.querySelectorAll('.experience__details').forEach((detail, index) => {
                detail.textContent = savedData.experienceDetails[index] !== undefined ? savedData.experienceDetails[index] : initialData.experienceDetails[index];
            });
        }
        if (savedData.toolsTitle !== undefined) document.querySelector('.tools__title').textContent = savedData.toolsTitle;
        if (savedData.toolsSectionTitles) {
            document.querySelectorAll('.tools__section-title').forEach((title, index) => {
                title.textContent = savedData.toolsSectionTitles[index] !== undefined ? savedData.toolsSectionTitles[index] : initialData.toolsSectionTitles[index];
            });
        }
        if (savedData.educationTitle !== undefined) document.querySelector('.education__title').textContent = savedData.educationTitle;
        if (savedData.educationYears) {
            document.querySelectorAll('.education__year').forEach((year, index) => {
                year.textContent = savedData.educationYears[index] !== undefined ? savedData.educationYears[index] : initialData.educationYears[index];
            });
        }
        if (savedData.educationCourses) {
            document.querySelectorAll('.education__course').forEach((course, index) => {
                course.textContent = savedData.educationCourses[index] !== undefined ? savedData.educationCourses[index] : initialData.educationCourses[index];
            });
        }
        if (savedData.educationHashtags) {
            document.querySelectorAll('.education__hashtag').forEach((hashtag, index) => {
                hashtag.textContent = savedData.educationHashtags[index] !== undefined ? savedData.educationHashtags[index] : initialData.educationHashtags[index];
            });
        }
        if (savedData.educationInstitutions) {
            document.querySelectorAll('.education__institution').forEach((inst, index) => {
                inst.textContent = savedData.educationInstitutions[index] !== undefined ? savedData.educationInstitutions[index] : initialData.educationInstitutions[index];
            });
        }
        if (savedData.interestsTitle !== undefined) document.querySelector('.interests__title').textContent = savedData.interestsTitle;
        if (savedData.interestsItems) {
            document.querySelectorAll('.interests__item').forEach((item, index) => {
                item.textContent = savedData.interestsItems[index] !== undefined ? savedData.interestsItems[index] : initialData.interestsItems[index];
            });
        }
        if (savedData.contactTitle !== undefined) document.querySelector('.contact__title').textContent = savedData.contactTitle;
        if (savedData.contactEmail !== undefined) document.querySelector('.contact__email').textContent = savedData.contactEmail;
    }

    // Вкл/выкл режим редактирования
    function toggleEditMode(isEditing) {
        const editableElements = [
            document.querySelector('.profile__intro'),
            document.querySelector('.profile__name'),
            document.querySelector('.profile__title'),
            document.querySelector('.languages__title'),
            ...document.querySelectorAll('.language__label'),
            document.querySelector('.experience__title'),
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
            bar.setAttribute('contenteditable', 'false'); // Запрещаем ввод текста
            if (isEditing) {
                bar.classList.add('editable'); // Добавляем класс для визуального стиля
                const fill = bar.querySelector('div');
                if (fill) fill.style.width = bar.getAttribute('data-level'); // Устанавливаем текущую ширину
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
        const data = {
            profileIntro: document.querySelector('.profile__intro')?.textContent.trim() || '',
            profileName: document.querySelector('.profile__name')?.textContent.trim() || '',
            profileTitle: document.querySelector('.profile__title')?.textContent.trim() || '',
            languagesTitle: document.querySelector('.languages__title')?.textContent.trim() || '',
            languageLabels: Array.from(document.querySelectorAll('.language__label')).map(label => label.textContent.trim()),
            languageLevels: Array.from(document.querySelectorAll('.language__bar')).map(bar => bar.getAttribute('data-level') || '0%'),
            experienceTitle: document.querySelector('.experience__title')?.textContent.trim() || '',
            experienceDates: Array.from(document.querySelectorAll('.experience__date')).map(date => date.textContent.trim()),
            experienceJobs: Array.from(document.querySelectorAll('.experience__job')).map(job => job.textContent.trim()),
            experienceDetails: Array.from(document.querySelectorAll('.experience__details')).map(detail => detail.textContent.trim()),
            toolsTitle: document.querySelector('.tools__title')?.textContent.trim() || '',
            toolsSectionTitles: Array.from(document.querySelectorAll('.tools__section-title')).map(title => title.textContent.trim()),
            educationTitle: document.querySelector('.education__title')?.textContent.trim() || '',
            educationYears: Array.from(document.querySelectorAll('.education__year')).map(year => year.textContent.trim()),
            educationCourses: Array.from(document.querySelectorAll('.education__course')).map(course => course.textContent.trim()),
            educationHashtags: Array.from(document.querySelectorAll('.education__hashtag')).map(hashtag => hashtag.textContent.trim()),
            educationInstitutions: Array.from(document.querySelectorAll('.education__institution')).map(inst => inst.textContent.trim()),
            interestsTitle: document.querySelector('.interests__title')?.textContent.trim() || '',
            interestsItems: Array.from(document.querySelectorAll('.interests__item')).map(item => item.textContent.trim()),
            contactTitle: document.querySelector('.contact__title')?.textContent.trim() || '',
            contactEmail: document.querySelector('.contact__email')?.textContent.trim() || ''
        };
        localStorage.setItem('resumeData', JSON.stringify(data));
    }

    function resetData() {
        if (document.querySelector('.profile__intro')) document.querySelector('.profile__intro').textContent = initialData.profileIntro;
        if (document.querySelector('.profile__name')) document.querySelector('.profile__name').textContent = initialData.profileName;
        if (document.querySelector('.profile__title')) document.querySelector('.profile__title').textContent = initialData.profileTitle;
        if (document.querySelector('.languages__title')) document.querySelector('.languages__title').textContent = initialData.languagesTitle;
        document.querySelectorAll('.language__label').forEach((label, index) => {
            label.textContent = initialData.languageLabels[index];
        });
        document.querySelectorAll('.language__bar').forEach((bar, index) => {
            bar.setAttribute('data-level', initialData.languageLevels[index]);
            const fill = bar.querySelector('div');
            if (fill) fill.style.width = initialData.languageLevels[index];
        });
        if (document.querySelector('.experience__title')) document.querySelector('.experience__title').textContent = initialData.experienceTitle;
        document.querySelectorAll('.experience__date').forEach((date, index) => {
            date.textContent = initialData.experienceDates[index];
        });
        document.querySelectorAll('.experience__job').forEach((job, index) => {
            job.textContent = initialData.experienceJobs[index];
        });
        document.querySelectorAll('.experience__details').forEach((detail, index) => {
            detail.textContent = initialData.experienceDetails[index];
        });
        document.querySelectorAll('.experience__description ul li').forEach((li, index) => {
            li.textContent = initialData.experienceDescriptionLis[index]; // Добавьте это в initialData
        });
        if (document.querySelector('.tools__title')) document.querySelector('.tools__title').textContent = initialData.toolsTitle;
        document.querySelectorAll('.tools__section-title').forEach((title, index) => {
            title.textContent = initialData.toolsSectionTitles[index];
        });
        if (document.querySelector('.education__title')) document.querySelector('.education__title').textContent = initialData.educationTitle;
        document.querySelectorAll('.education__year').forEach((year, index) => {
            year.textContent = initialData.educationYears[index];
        });
        document.querySelectorAll('.education__course').forEach((course, index) => {
            course.textContent = initialData.educationCourses[index];
        });
        document.querySelectorAll('.education__hashtag').forEach((hashtag, index) => {
            hashtag.textContent = initialData.educationHashtags[index];
        });
        document.querySelectorAll('.education__institution').forEach((inst, index) => {
            inst.textContent = initialData.educationInstitutions[index];
        });
        if (document.querySelector('.interests__title')) document.querySelector('.interests__title').textContent = initialData.interestsTitle;
        document.querySelectorAll('.interests__item').forEach((item, index) => {
            item.textContent = initialData.interestsItems[index];
        });
        if (document.querySelector('.contact__title')) document.querySelector('.contact__title').textContent = initialData.contactTitle;
        if (document.querySelector('.contact__email')) document.querySelector('.contact__email').textContent = initialData.contactEmail;

        saveData(); // Сохраняем исходное состояние
        toggleEditMode(false); // Выключаем режим редактирования после сброса
    }


    loadSavedData();

    const editBtn = document.querySelector('.resume__edit-btn');
    const resetBtn = document.querySelector('.resume__reset-btn');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const isEditing = editBtn.textContent === 'Edit';
            toggleEditMode(isEditing);
            if (!isEditing) saveData(); // Сохраняем при выходе из режима редактирования
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetData);
    }

    document.addEventListener('blur', (event) => {
        // Проверяем, является ли целевой элемент редактируемым и имеет ли contenteditable="true"
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

