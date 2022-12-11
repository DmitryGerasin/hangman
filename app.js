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


const express           = require(`express`)
   const app            = express()
const http              = require(`http`)
const path              = require(`path`)
const {
   PORT,
   HOSTNAME,
}                       = require(`./misc/config.json`)


// 1. Bodyparser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// 2. Router
app.use(require(`./routes/index`))

// 3. Start server (only listens to 127.0.0.1 (nginx) to prevent direct access via port 8080)
http.createServer(app).listen(PORT, HOSTNAME, () => { 
   console.log(`HTTP Server running on port ${PORT}`)
})