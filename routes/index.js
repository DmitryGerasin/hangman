import { 
   createRequire 
}                       from 'module'
   const require        = createRequire(import.meta.url)

import { 
   bacon, 
   getPastGuesses 
}                       from '../coolFunctions/regex.js'
const dictionary        = require(`../dictionary`)
import guess            from '../coolFunctions/guess.js'
import express          from 'express'
const router            = express.Router()
const {
   showReg,
   showRemainingDictionary,
   showRemainingDictionaryLength,
   showFinalAnswer,
}                       = require(`../misc/config.json`)

/*============================================================================
= = = = = = = = = = = = = = = = = = ROUTES = = = = = = = = = = = = = = = = = =
============================================================================*/

router.get(`/get-help/:wordStructure/:wrongGuesses`, makeGuess)

export default router


/*============================================================================
= = = = = = = = = = = = = = = = = FUNCTIONS = = = = = = = = = = = = = = = = =
============================================================================*/

function makeGuess(req, res) {
   const wordStructure = JSON.parse(req.params.wordStructure)
   const wrongGuesses = JSON.parse(req.params.wrongGuesses)
   // console.log(wordStructure, wrongGuesses) // log to confirm GET request was correctly formed during development

   // 1. Setup
   const pastGuesses       = getPastGuesses(wordStructure, wrongGuesses)
   const reg               = bacon(wordStructure, pastGuesses)

   // 2. Search dictionary for matches
   let reducedDictionary = dictionary.filter(word => reg.test(word[0]))

   if(showReg) console.log(reg)
   if(showRemainingDictionary) console.log(reducedDictionary)
   if(showRemainingDictionaryLength) console.log(`Words remaining: `, reducedDictionary.length)

   if(reducedDictionary.length === 0) return console.log(`No more words in the dictionary`)
   if(reducedDictionary.length === 1) return console.log(`Final guess`, reducedDictionary[0])

   // 3. Make guess
   const {weighted, plain} = guess(reducedDictionary, pastGuesses)
   // console.timeEnd(`Optimal letter found in`)

   if(showFinalAnswer) console.log(weighted, plain)
   res.send({
      weighted: weighted,
      plain: plain,
   })
}