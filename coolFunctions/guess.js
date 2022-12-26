import { 
   createRequire 
}                       from 'module'
const require           = createRequire(import.meta.url)
const letters           = require(`../misc/letters.json`)
const {
   showLettersWeightsAfterGuessIsMade,
}                       = require(`../misc/config.json`)

/**
 * Function 
 * @param {[string, number][]} dictionary
 * @param {string[]} pastGuesses 
 * @returns {{[string, number], [string, number]}} Best guess for letter and it's weight
 */
const guess = (dictionary, pastGuesses) => {
   // letters that have not been guessed previously, we are picking one of them
   const remainingLetters = letters.filter(one => !pastGuesses.includes(one))

   const possibleGuessesWeighted = {}
   for (let i = 0; i < remainingLetters.length; i++) {
      possibleGuessesWeighted[remainingLetters[i]] = 0
   }

   const possibleGuessesPlain = {}
   for (let i = 0; i < remainingLetters.length; i++) {
      possibleGuessesPlain[remainingLetters[i]] = 0
   }

   // calculate the success odds for guessing each letter
   // done by increasing the value of each letter by the weight of each word in which it is present
   // but only once - do not add the value of 'p' twice for the word 'apple'
   let totalWeight = 0
   for (let i = 0; i < dictionary.length; i++) {
      const [word, weight] = dictionary[i]

      // get unique letters of the word
      const uniqueLetters = [...new Set(word)]

      // increment each letter weight
      for (let i = 0; i < uniqueLetters.length; i++) {
         const letter = uniqueLetters[i]
         if(!remainingLetters.includes(letter)) continue

         possibleGuessesWeighted[letter] += weight
         totalWeight += weight // for getting confidence % later by dividing a given letter's confidence by total

         possibleGuessesPlain[letter]++
      }
   }

   // 1. WEIGHTED: convert object into array in the same format as the dictionary (i.e.: [ ['a': 1], ['b': 2], ... ])
   const weightedLetters = []
   for (let [key, value] of Object.entries(possibleGuessesWeighted)) {
      weightedLetters.push([key, value])
   }
   weightedLetters.sort((a, b) => b[1] - a[1])

   // 2. PLAIN: convert object into array in the same format as the dictionary (i.e.: [ ['a': 1], ['b': 2], ... ])
   const plainLetters = []
   for (let [key, value] of Object.entries(possibleGuessesPlain)) {
      plainLetters.push([key, value])
   }
   plainLetters.sort((a, b) => b[1] - a[1])


   const getPercentage = (n, total) => `${Math.round((n/total)*100*100)/100}%`

   if(showLettersWeightsAfterGuessIsMade) console.log(weightedLetters)

   const output = {
      weighted: [weightedLetters[0][0], getPercentage(weightedLetters[0][1], totalWeight)],
      plain: [plainLetters[0][0], getPercentage(plainLetters[0][1], dictionary.length)]
   }

   return output
   
}

export default guess