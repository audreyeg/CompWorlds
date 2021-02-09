

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CowWorld</title>
  
    <script type="text/javascript" src="./assetmanager.js"></script>
    <script type="text/javascript" src="./timer.js"></script>
    <script type="text/javascript" src="./gameengine.js"></script>
    <script type="text/javascript" src="./animator.js"></script>
    <script type="text/javascript" src="./dialog.js"></script>
    <script type="text/javascript" src="./coyote.js"></script>
    <script type="text/javascript" src="./cowboy.js"></script>
    <script type="text/javascript" src="./npc.js"></script>
    <script type="text/javascript" src="./ground.js"></script>
    <script type="text/javascript" src="./pickUps.js"></script>
    <script type="text/javascript" src="./fight.js"></script>
    <script type="text/javascript" src="./loadingZones.js"></script>
    <script type="text/javascript" src="./OverWorld.js"></script>
    <script type="text/javascript" src="./interior.js"></script>
    <script type="text/javascript" src="./sceneManager.js"></script>
    <script type="text/javascript" src="./util.js"></script>
    <script type="text/javascript" src="./boundingbox.js"></script>
    <script type="text/javascript" src="./inventory.js"></script>
    <script type="text/javascript" src="./main.js"></script>
    <script type="text/javascript" src="./scenes.js"></script>

<style>
    #townSong 
    {
        background-color: tan;
        color: red;
        font-family: Papyrus;
        bottom: 0;
        left: 0;
        top: 200;
        position: absolute;
        width: 1400px;
        height: 770px;
        text-align: center; 
        font-size: 100px;
        overflow:hidden;

    }


</style>


</head>
<body>
    <div>
    </div>
    <canvas id="gameWorld" width="1400" height="768" style="background: tan;" tabindex ="0" autofocus></canvas>
       <div>
        <strong>Inventory</strong><br/>
    </div>

    <div id="inventory">
    </div>
    <!-- Where npc says their lines -->
     <div id="chat" style = "color: black; font-family: Papyrus">
    </div>
    <!-- Where player response options are  -->
    <button id = "response1" onclick = "change(this, 1)" style = "color: red; font-family: Papyrus"></button>
    <button id = "response2" onclick = "change(this, 2)" style = "color: red; font-family: Papyrus"></button>

    <script>
    	var userresponded = false;
    	var response = 0;
        playerInventory = new Inventory();

        //checks to see when the user responds (button is pushed)
        function change(btn, option) {
        	this.userresponded = true;
            console.log(this.userresponded);
            console.log(userresponded);
      	  	var clicked = true;
            //sets response to either 1 or 2 depending if user selected 1st or 2nd button
      	  	this.response = option;
            console.log(this.response);
       	 	responded(clicked);
         }
            //clears the chat/buttons 
     	function responded(clicked) 
          	{
            	if (clicked) {
            	document.getElementById("response1").innerHTML = "";
            	document.getElementById("response2").innerHTML = "";
            	document.getElementById("chat").innerHTML = "";
            	}
            }
            function playTownMusic() {
                document.getElementById("townAudio").play();
                townSong.style.visibility = "hidden";
            }
  
    </script>
  

    <input type="button" value="START GAME" id = "townSong" onclick="playTownMusic()">
    <audio loop id="townAudio" src="./townSong.mp3"></audio>
    <audio loop id="saloonAudio" src="./saloonSong.mp3"></audio>
     <audio loop id="fightAudio" src="./fightSong.mp3"></audio>

</body>
</html>
