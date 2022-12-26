import { 
   createRequire 
}                       from 'module'
   const require        = createRequire(import.meta.url)

const dictionary        = require(`../dictionary`)
const success           = require(`./2022-12-26_succeeded.json`)
const failure           = require(`./2022-12-26_failed.json`)

console.log(`Total words in dictionary:`, dictionary.length)
console.log(`Total words guessed successfully:`, success.length)
console.log(`Total words failed to guess:`, failure.length)

const roundTo = (num, precision=1) => {
   return Math.round(num * (1/precision))/(1/precision)
}



/* * * * * *                  %success, %failure                   * * * * * */
const successPercent = success.length * 100 / dictionary.length
const failurePercent = failure.length * 100 / dictionary.length
console.log(`Success rate: ${roundTo(successPercent, 0.01)}%`)
console.log(`Failure rate: ${roundTo(failurePercent, 0.01)}%`)



/* * * * * *   how many words of every length failed / succeeded   * * * * * */
/* * * * * *          %success & %failure by word length           * * * * * */
const wordLengthsSucceeded = {}
const wordLengthsFailed = {}
const wordLengthsSucceededPercent = []
const wordLengthsFailedPercent = []

for (let i = 0; i < 100; i++) {
   wordLengthsSucceeded[i] = 0
   wordLengthsFailed[i] = 0
}

for (let i = 0; i < success.length; i++) {
   const [word, frequency, failedGuesses] = success[i]
   wordLengthsSucceeded[word.length]++
}
for (let i = 0; i < failure.length; i++) {
   const [word, frequency, failedGuesses, wordsRemaining] = failure[i]
   wordLengthsFailed[word.length]++
}
for (let i = 0; i < 100; i++) {
   const total = wordLengthsSucceeded[i] + wordLengthsFailed[i]
   if(total === 0) continue
   wordLengthsSucceededPercent.push([
      i, 
      roundTo((wordLengthsSucceeded[i] / total) * 100, 0.001), 
      `${wordLengthsSucceeded[i]} / ${total}`
   ])
   if(wordLengthsFailed[i] > 0) wordLengthsFailedPercent.push([
      i, 
      roundTo((wordLengthsFailed[i] / total) * 100, 0.001), 
      `${wordLengthsFailed[i]} / ${total}`
   ])
}

for (let i = 0; i < 100; i++) {
   if(wordLengthsSucceeded[i] === 0) delete wordLengthsSucceeded[i]
   if(wordLengthsFailed[i] === 0) delete wordLengthsFailed[i]
}

console.log(`Words guessed successfully by word length:`, wordLengthsSucceeded)
console.log(`Words failed to guess by word length:`, wordLengthsFailed)

console.log(`Success rate by word length:`, wordLengthsSucceededPercent)
console.log(`Fail rate by word length:`, wordLengthsFailedPercent)



/* * * * * *          how many words in a given frequency          * * * * * */
