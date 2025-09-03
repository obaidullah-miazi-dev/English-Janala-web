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
    <button id="lesson-btn-${lessons.level_no}" onclick="loadWord(${lessons.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson- ${lessons.level_no}</button>
    `

    lessonContainer.append(newDiv)
    }
}

const removeActive=()=>{
    const lessonBtn= document.querySelectorAll('.lesson-btn')
        lessonBtn.forEach(btn=>btn.classList.remove('active'))
}

const loadWord= (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=> res.json())
    .then(data => {
        removeActive()
        const clickBtn= document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add('active')
        displayWord(data.data)
    })
}

            


const displayWord = (words) =>{
    const wordContainer= document.getElementById('word-container')

    wordContainer.innerHTML='';

    if(words.length === 0){
        wordContainer.innerHTML=`
        <div class="text-center space-y-5 py-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-600 font-medium font-bengali text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl font-bengali">নেক্সট Lesson এ যান</h2>
           </div>
        `;
        return;
    }

    words.forEach(word => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML=`
         <div class="bg-white rounded-xl py-12 px-8 w-[280px] md:w-[500px] text-center space-y-4">
                <h2 class="font-bold text-2xl">${word.word?word.word:'No Word Found ❌'}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <h2 class="font-bold font-bengali text-2xl mb-14">"${word.meaning?word.meaning:'No Meaning Found ❌'} / ${word.pronunciation?word.pronunciation:'No Pronunciation Found ❌'}"</h2>

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