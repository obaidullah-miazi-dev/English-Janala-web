const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => getLesson(data.data))
}

const getLesson = (lesson) => {
    const lessonContainer = document.getElementById('lesson-container')
    lessonContainer.innerHTML = '';

    for (const lessons of lesson){
        const newDiv = document.createElement('div')
    newDiv.innerHTML = `
    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${lessons.level_no}</button>
    `

    lessonContainer.append(newDiv)
    }
}

loadLessons();