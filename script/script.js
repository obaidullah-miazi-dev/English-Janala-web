const createElement= (arr)=>{
    const htmlElement= arr.map(el => `<span class="btn bg-sky-50 border-sky-200">${el}</span>`)
    return htmlElement.join(' ');
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => getLesson(data.data))
}

const manageSpinner=(status)=>{
    if(status=== true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('word-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}

const getLesson = (lesson) => {
    const lessonContainer = document.getElementById('lesson-container')
    lessonContainer.innerHTML = '';

    for (const lessons of lesson) {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
    <button id="lesson-btn-${lessons.level_no}" onclick="loadWord(${lessons.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson- ${lessons.level_no}</button>
    `

        lessonContainer.append(newDiv)
    }
}

const removeActive = () => {
    const lessonBtn = document.querySelectorAll('.lesson-btn')
    lessonBtn.forEach(btn => btn.classList.remove('active'))
}

const loadWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add('active')
            displayWord(data.data)
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details =await res.json();
    displayWordDetail(details.data)
}


const displayWordDetail=(word)=>{
    console.log(word)
    const detailsContainer=document.getElementById('details-container');
    detailsContainer.innerHTML=`
     <div>
                        <h2 class="font-bold text-2xl">
                            ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
                        </h2>
                    </div>

                    <div>
                        <h2 class="font-bold">
                            Meaning
                        </h2>
                        <p>${word.meaning}</p>
                    </div>

                    <div>
                        <h2 class="font-bold">
                            Example
                        </h2>
                        <p>${word.sentence}</p>
                    </div>

                    <div class="space-x-2">
                        <h2 class="font-bold mb-2">
                            Synonyms
                        </h2>
                        <div>${createElement(word.synonyms)}</div>
                    </div>

    `;

    document.getElementById('word_modal').showModal()
}



const displayWord = (words) => {
    const wordContainer = document.getElementById('word-container')

    wordContainer.innerHTML = '';

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center space-y-5 py-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-600 font-medium font-bengali text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl font-bengali">নেক্সট Lesson এ যান</h2>
           </div>
        `;
        manageSpinner(false)
        return;
    }

    words.forEach(word => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
         <div class="bg-white rounded-xl py-12 px-8 w-[280px] md:w-[500px] text-center space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : 'No Word Found ❌'}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <h2 class="font-bold font-bengali text-2xl mb-14">"${word.meaning ? word.meaning : 'No Meaning Found ❌'} / ${word.pronunciation ? word.pronunciation : 'No Pronunciation Found ❌'}"</h2>

                <div class="flex justify-between items-center md:px-8 px-2">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-50 hover:bg-blue-300"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `

        wordContainer.append(cardDiv)
    });
    manageSpinner(false)
}

loadLessons();


document.getElementById('search-btn').addEventListener('click',()=>{
    removeActive();
    const input= document.getElementById('search-input')

    const inputValue=input.value.trim().toLowerCase();

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res=> res.json())
    .then(data=>{
        const allWords= data.data;
        const filterWord=allWords.filter(word=>word.word.toLowerCase().includes(inputValue));
        displayWord(filterWord)
    })
    
})