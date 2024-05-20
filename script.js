const inputWord = document.querySelector('#inp-word')
const searchButton = document.querySelector('#search-btn')
const wordElem = document.querySelector('h3')
const wordDetailElem = document.querySelector('.details')
const audio = document.querySelector('audio')
const audioShape = document.querySelector('.audio')
const definitionElem = document.querySelector('.word-meaning')
const wordExampleElem = document.querySelector('.word-example')
const resultElem = document.querySelector('.result')


inputWord.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && inputWord.value != '') {
        tranclate(inputWord.value)
    }
})

searchButton.addEventListener('click', () => {
    if (inputWord.value != '') {
        tranclate(inputWord.value)
    }
})

audioShape.addEventListener('click', () => {
    audio.play()
})

function tranclate(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(deatails => deatails.json())
        .then(wordDescription => {
            wordDetailElem.style.display = 'flex'
            definitionElem.style.display = 'block'
            wordExampleElem.style.display = 'block'

            wordElem.innerHTML = wordDescription[0].word

            wordDetailElem.children[1].innerHTML = wordDescription[0].phonetics[0].text

            if (wordDescription[0].phonetics[0].audio != '') {
                audioShape.style.display = 'block'
                audio.setAttribute('src', wordDescription[0].phonetics[0].audio)
            } else {
                audioShape.style.display = 'none'
            }

            definitionElem.innerHTML = wordDescription[0].meanings[0].definitions[0].definition

            wordExampleElem.innerHTML = wordDescription[0].meanings[0].definitions[0].example
        })
        .catch(err => {
            audioShape.style.display = 'none'
            wordDetailElem.style.display = 'none'
            definitionElem.style.display = 'none'
            wordExampleElem.style.display = 'none'

            wordElem.innerHTML = 'WORD NOT FOUND !!!'
        })
}