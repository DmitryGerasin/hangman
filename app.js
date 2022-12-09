/**
 * Fucking sick-ass algorithm to wreck anyone who dares to stand up against in in the game of...
 * 
 * HHHHHHHHH     HHHHHHHHH                                                                                                                  
 * H:::::::H     H:::::::H                                                                                                                  
 * H:::::::H     H:::::::H                                                                                                                  
 * HH::::::H     H::::::HH                                                                                                                  
 *   H:::::H     H:::::H    aaaaaaaaaaaaa  nnnn  nnnnnnnn       ggggggggg   ggggg   mmmmmmm    mmmmmmm     aaaaaaaaaaaaa  nnnn  nnnnnnnn    
 *   H:::::H     H:::::H    a::::::::::::a n:::nn::::::::nn    g:::::::::ggg::::g mm:::::::m  m:::::::mm   a::::::::::::a n:::nn::::::::nn  
 *   H::::::HHHHH::::::H    aaaaaaaaa:::::an::::::::::::::nn  g:::::::::::::::::gm::::::::::mm::::::::::m  aaaaaaaaa:::::an::::::::::::::nn 
 *   H:::::::::::::::::H             a::::ann:::::::::::::::ng::::::ggggg::::::ggm::::::::::::::::::::::m           a::::ann:::::::::::::::n
 *   H:::::::::::::::::H      aaaaaaa:::::a  n:::::nnnn:::::ng:::::g     g:::::g m:::::mmm::::::mmm:::::m    aaaaaaa:::::a  n:::::nnnn:::::n
 *   H::::::HHHHH::::::H    aa::::::::::::a  n::::n    n::::ng:::::g     g:::::g m::::m   m::::m   m::::m  aa::::::::::::a  n::::n    n::::n
 *   H:::::H     H:::::H   a::::aaaa::::::a  n::::n    n::::ng:::::g     g:::::g m::::m   m::::m   m::::m a::::aaaa::::::a  n::::n    n::::n
 *   H:::::H     H:::::H  a::::a    a:::::a  n::::n    n::::ng::::::g    g:::::g m::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n
 * HH::::::H     H::::::HHa::::a    a:::::a  n::::n    n::::ng:::::::ggggg:::::g m::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n
 * H:::::::H     H:::::::Ha:::::aaaa::::::a  n::::n    n::::n g::::::::::::::::g m::::m   m::::m   m::::ma:::::aaaa::::::a  n::::n    n::::n
 * H:::::::H     H:::::::H a::::::::::aa:::a n::::n    n::::n  gg::::::::::::::g m::::m   m::::m   m::::m a::::::::::aa:::a n::::n    n::::n
 * HHHHHHHHH     HHHHHHHHH  aaaaaaaaaa  aaaa nnnnnn    nnnnnn    gggggggg::::::g mmmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaa nnnnnn    nnnnnn
 *                                                                       g:::::g                                                            
 *                                                           gggggg      g:::::g                                                            
 *                                                           g:::::gg   gg:::::g                                                            
 *                                                            g::::::ggg:::::::g                                                            
 *                                                             gg:::::::::::::g                                                             
 *                                                               ggg::::::ggg                                                               
 *                                                                  gggggg                                                                  
 * 
 * @author Dmitry Gerasin <dmitry.gerasin@mail.mcgill.ca>
 * @author Ronald Truong <pika_ron38@hotmail.com>
 */


// Start all timers
console.time(`Optimal letter found in`)
console.time(`No more words in the dictionary`)
console.time(`Final guess`)

// load all things
const {
   showReg,
   showRemainingDictionary,
   showRemainingDictionaryLength,
   showBestGuessWeight,
}                       = require(`./misc/config.json`)
const dictionary        = require(`./dictionary`)
const {
   bacon,
   getPastGuesses,
}                       = require(`./coolFunctions/regex`)
const {
   guess,
}                       = require(`./coolFunctions/guess`)
const {
   wordStructure,
   wrongGuesses,
}                       = require(`./input`)

// 1. Setup
const pastGuesses       = getPastGuesses(wordStructure, wrongGuesses)
const reg               = bacon(wordStructure, pastGuesses)

// 2. Search dictionary for matches
let reducedDictionary = dictionary.filter(word => reg.test(word[0]))

if(showReg) console.log(reg)
if(showRemainingDictionary) console.log(reducedDictionary)
if(showRemainingDictionaryLength) console.log(`Words remaining: `, reducedDictionary.length)

if(reducedDictionary.length === 0) return console.timeEnd(`No more words in the dictionary`)
if(reducedDictionary.length === 1) {
   console.timeEnd(`Final guess`)
   console.log(reducedDictionary[0])
   return
}

// 3. Make guess
const {weighted, plain} = guess(reducedDictionary, pastGuesses)
console.timeEnd(`Optimal letter found in`)
// console.log(
//    `weighted:`, weighted[0],
//    ...showBestGuessWeight? [bestGuessWeight]:[]
// )

console.log(weighted, plain)
