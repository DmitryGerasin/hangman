import { 
   createRequire 
}                       from 'module'
const require           = createRequire(import.meta.url)
const letters           = require(`../misc/letters.json`)

/**
 * @param {(null|string)[]} wordForm - Array of letters and null values representing the current state of the word being guessed.
 * @param {string[]} wrongGuesses - Array of letters that are not part of the word.
 * @returns {string[]} Array of all letters that have been guessed by now (including correct and wrong guesses).
 */
const getPastGuesses = (wordForm, wrongGuesses) => {
   return [
      ...wrongGuesses,
      ...new Set(wordForm.filter(one => Boolean(one) && !wrongGuesses.includes(one)))
   ]
}

/**
 * Magic function that generates a regex describing all words that match current `wordForm` and excludes `pastGuesses`
 * @param {string[]} wordForm - sth like `['e', null, 'e', null, null, null, null, null]` for `elephant`
 * @param {string[]} pastGuesses - letters already guessed
 */
const bacon = (wordForm, pastGuesses) => {

   // Get the set of remaining letters
   const filtered = letters.filter(letter => !pastGuesses.includes(letter))

   const x = filtered.join(``)

   let finalForm = `^`
   wordForm.forEach(element => {
      if(element === null) {
         // blank
         finalForm += `[${x}]`
      } else {
         // letter
         finalForm += element
      }
      
   })
   finalForm += `$`

   const reg = new RegExp(finalForm)

   return reg
}

export {
   bacon,
   getPastGuesses,
}