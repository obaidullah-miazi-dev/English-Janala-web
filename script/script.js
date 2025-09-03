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
    <button onclick="loadWord(${lessons.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${lessons.level_no}</button>
    `

    lessonContainer.append(newDiv)
    }
}

const loadWord= (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=> res.json())
    .then(data => displayWord(data.data))
}

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayWord = (words) =>{
    const wordContainer= document.getElementById('word-container')

    wordContainer.innerHTML='';

    words.forEach(word => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML=`
         <div class="bg-white rounded-xl py-12 px-8 w-[280px] md:w-[500px] text-center space-y-4">
                <h2 class="font-bold text-2xl">${word.word}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <h2 class="font-bold font-bengali text-2xl mb-14">"${word.meaning} / ${word.pronunciation}"</h2>

                <div class="flex justify-between items-center md:px-8 px-2">
                    <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `

        wordContainer.append(cardDiv)
    });
}

loadLessons();