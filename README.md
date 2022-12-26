# Hangman

## Use notes: 
   - The dictionaries must only contain lowercase letters
   - Words being guessed should not contain spaces or hyphens
   - Send GET request to `/get-help/:wordStructure/:wrongGuesses` to receive guess suggestions
      - `:wordStructure` must be an array of letters and null values representing the word being guessed
      - Ex.: `["a", "p", "p", "l", null]` for the word "apple" being guessed
      - `:wrongGuesses` bust be an array of letters that are not part of the word (empty array `[]` for no wrong guesses so far)

## File structure
   - `/dictionary` contains the index.json file which is the generated dictionary used to search for words
   - `dict_merge.ipynb` pools words and their weights form every file in that folder that is not index.json, eliminates duplicates with the lowest weights, generates the index.json file
      * words dictionaries with no weights have weight 1
   - `/misc` contains reference files
   - `/successRateTest` runs the app on every work in the compiled dictionary and saves words it succeeded on and words in failed on to different files in json format
   - `/coolFunctions` is self explanatory

## Sources:
   - weightedDictionary.json: https://www.kaggle.com/datasets/rtatman/english-word-frequency
   - scrabbleDictionary.json: scrabble
   - dictionary.json: github somewhere....
