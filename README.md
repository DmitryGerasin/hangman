# Hangman

## Use notes: 
   - The dictionaries must only contain lowercase letters
   - Words being guessed should not contain spaces or hyphens
   - Send GET request to `/get-help/:wordStructure/:wrongGuesses` to receive guess suggestions
      - `:wordStructure` must be an array of letters and null values representing the word being guessed
      - Ex.: `["a", "p", "p", "l", null]` for the word "apple" being guessed
      - `:wrongGuesses` bust be an array of letters that are not part of the word (empty array `[]` for no wrong guesses so far)

## Compiled dictionary
   **_Words in the dictionary must have meaning(s) beyond their component letters that are neither names nor abbreviations._**

### Excluded words
   1. All single letter words except "I", "a", and "o". [source](https://english.stackexchange.com/questions/225537/one-letter-words-in-english-language "English StackExchange")
   2. There are 107 acceptable 2-letter words listed in the Official Scrabble Players Dictionary, 6th Edition (OSPD6), and the Official Tournament and Club Word List (OTCWL, or simply, TWL) [source](https://en.wikibooks.org/wiki/Scrabble/Two_Letter_Words "wikibooks")
      - Since most of these are still nonsense words - the 20 or so actual words among them should be heavily preferred
   3. There is some confusion with regard to 3-letter words
      - There are 333 3-letter words listed in the [wiktionary](https://en.wiktionary.org/wiki/Category:English_three-letter_words "Category:English three-letter words")
      - There are 1068 3-letter words listed in the [Merriam-Webster](https://scrabble.merriam.com/3-letter-words "Three Letter Words")
      - there are 26^3 = 17576 possible 3-letter combinations 
      - the currently compiled dictionary contains 12988 3-letter words, which surely is excessive and needs to be adressed
      

### Sources of used dictionaries:
   - weightedDictionary.json: https://www.kaggle.com/datasets/rtatman/english-word-frequency
   - scrabbleDictionary.json: scrabble
   - dictionary.json: github somewhere....


## File structure
   - `/dictionary` contains the index.json file which is the generated dictionary used to search for words
   - `dict_merge.ipynb` pools words and their weights form every file in that folder that is not index.json, eliminates duplicates with the lowest weights, generates the index.json file
      * words dictionaries with no weights have weight 1
   - `/misc` contains reference files
   - `/successRateTest` runs the app on every work in the compiled dictionary and saves words it succeeded on and words in failed on to different files in json format
   - `/coolFunctions` is self explanatory
