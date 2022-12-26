import { bacon }        from '../coolFunctions/regex.js'
import cliProgress      from 'cli-progress'
import { 
   createRequire 
}                       from 'module'
   const require        = createRequire(import.meta.url)

const dictionary        = require(`../dictionary`)
import fs               from 'fs'
import guess            from '../coolFunctions/guess.js'
const letters           = require(`../misc/letters.json`)

// start timer
console.time(`total time`)

// set some parameters
const maxWrongGuesses = 6
const maxAttempts = letters.length
const useWeighted = true
const percentOfDictionaryToUse = 100
const totalWords = Math.floor(dictionary.length * percentOfDictionaryToUse / 100)

// reset output files
try {
   fs.unlinkSync(`./models/success.json`)
} catch (e) {
   if(e.code !== `ENOENT`) throw e
}
try {
   fs.unlinkSync(`./models/failure.json`)
} catch (e) {
   if(e.code !== `ENOENT`) throw e
}

// set up write streams
const successWS = fs.createWriteStream(`./models/success.json`, {flags: `a`}) // `a` means appending (old data will be preserved
const failuresWS = fs.createWriteStream(`./models/failure.json`, {flags: `a`})
let successSep = ``
let failureSep = ``
const appendSuccess = (text) => { // function to append to new line every time
   successWS.write(`${successSep}\n   ${JSON.stringify(text)}`)
   if(!successSep) successSep = `,`
}
const appendFailure = (text) => {
   failuresWS.write(`${failureSep}\n   ${JSON.stringify(text)}`)
   if(!failureSep) failureSep = `,`
}
successWS.write(`[`)
failuresWS.write(`[`)

console.log(`Total dictionary length: ${dictionary.length}`)
console.log(`Running on ${percentOfDictionaryToUse}% of the dictionary (${totalWords} words)`)

// set up a progress bar
const opt = {
   format: `progress [{bar}] {percentage}% | ETA: {eta_formatted} | {value}/{total} | Current word: {word}`,
   stopOnComplete: true,
   clearOnComplete: true,
   barsize: 75,
   etaBuffer: 250,
}
const progBar = new cliProgress.SingleBar(opt, cliProgress.Presets.shades_grey)
progBar.start(totalWords, 0, {word: ``})




// start checking each word
for (let i = 0; i < totalWords; i++) {
   const [word, relativeFrequency] = dictionary[i]
   let reducedDictionary = require(`../dictionary`)
   progBar.update(i+1, {word: word})

   // 1. create null word structure and other setup
   const wordStructure = new Array(word.length).fill(null)
   const pastGuesses = []
   const wrongGuesses = []
   let solved = false
   
   // 2. try to solve the word
   while (
      !solved && 
      wrongGuesses.length < maxWrongGuesses &&
      pastGuesses.length < maxAttempts
   ) {
      // 2.1 get regex and filter dictionary
      const reg = bacon(wordStructure, pastGuesses)
      reducedDictionary = reducedDictionary.filter(word => reg.test(word[0]))
      
      // 2.2. if a single word left - we’ve found the solution 
      if(reducedDictionary.length === 1) {
         solved = true
         appendSuccess([...reducedDictionary[0], wrongGuesses])
         break
      }

      // 2.3 generate the next letter to guess, add it to pastGuesses
      const { weighted, plain } = guess(reducedDictionary, pastGuesses)
      const letter = useWeighted? weighted[0]:plain[0]
      pastGuesses.push(letter)

      // 2.4 apply letter to word structure / add it to wron guesses
      if(word.includes(letter)) {
         for (let j = 0; j < word.length; j++) {
            if(word[j] !== letter) continue
            wordStructure[j] = letter
         }

      } else {
         wrongGuesses.push(letter)
      }
   }
   
   if(!solved) appendFailure([word, relativeFrequency, wrongGuesses, reducedDictionary.length])

}




successWS.write(`\n]`)
failuresWS.write(`\n]`)
successWS.end() // close write stream
failuresWS.end() // close write stream

console.timeEnd(`total time`)