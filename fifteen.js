/*CSCI 366
Lab9: Fifteen Puzzle
JavaScript File*/

"use strict" // Use strict mode for code //

//Declared varibles to interact with the puzzle//
var puzzlesquare;//individual squares
var xcoord; //initialization of blank space coordinates
var ycoord;
var position;// position to keep track of which square to check when searching
window.onload = function() {
	//Apply class to the puzzle and get the squares//
 	var puzzlearea = document.getElementById('puzzlearea');
	puzzlesquare = puzzlearea.getElementsByTagName('div');
	
	//Loop through divs to individualize each square in its own section//
	for (var i = 0; i < puzzlesquare.length; i++)
	{
		// make 4x4 puzzle//
		puzzlesquare[i].className = "puzzlesquare";
		puzzlesquare[i].style.left = (i%4*100)+'px'; //x-coordinate
		puzzlesquare[i].style.top = (parseInt(i/4)*100) + 'px'; // y-coordinate
		//set background//
		puzzlesquare[i].style.backgroundPosition= '-' + puzzlesquare[i].style.left + ' ' 
											    + '-' + puzzlesquare[i].style.top; 
		//set coordinates for blank space//
		xcoord = '300px'; 
		ycoord = '300px';
		puzzlesquare[i].onmouseover = function() //applies attributes when mouse moves squares

		{
			if (checkMove(parseInt(this.style.left), parseInt(this.style.top)) == true) //checks if move can be made

			{
				this.classList.add("moveable"); //change to red when a puzzle piece is near the blank space
			}
		};
		puzzlesquare[i].onmouseout = function() //removes attribute when mouse moves away from square

		{
			this.classList.remove("moveable"); //reverts to its original border and color
		};
		puzzlesquare[i].onclick = function() //slides pieces into black space if able
		{
			if (checkMove(parseInt(this.style.left), parseInt(this.style.top)) == true) //checks whether or not apiece can move into the blank space
			{
				swap(parseInt(this.style.left), parseInt(this.style.top)); //moves into an blank space 
				if(win() == true)//checks if winning condition as been acheived
				{
					notify();//alert message
				}
				return;
			}
		};
		
	}
	var shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button
	shuffle.onclick = function() //activates the shuffle button
	{
		for (var i = 0; i < 300; i++)//moves pieces up to 300x
		{
			var rand = randomInt(1,5);// random number (1-4,inclusive)
			//depedning on number, blank space is swapped with random surrounding element//
			if(rand == 1)//up
			{
				var x = parseInt(xcoord); 
	    		var y = parseInt(ycoord) - 100;
				if(checkMove(x,y))
				{
					swap(x, y);
				}
			}
			else if(rand == 2)//right
			{
				var x = parseInt(xcoord) + 100; 
				var y = parseInt(ycoord);	
				if(checkMove(x,y))
				{
					swap(x, y);
				}
			}
			else if(rand == 3)//down
			{
				var x = parseInt(xcoord) - 100;  
				var y = parseInt(ycoord);	
				if(checkMove(x,y))
				{
					swap(x, y);
				}
			}
			else if(rand == 4)//left
			{
				var x= parseInt(xcoord);                  
				var y = parseInt(ycoord) + 100;	
				if(checkMove(x,y))
				{
					swap(x, y);
				}
			}
		}
	};
 }
function checkMove(x, y)//function to check mobility
{
	
	if (left(x, y))
	{
		return true;
	}
	else if (down(x, y))
	{
		return true;
	}
    else if (up(x, y))
    {
		return true;
	}
	else if (right(x, y))
	{
		return true;
	}
 }
function left(x, y)//check left
{
 	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX - 100 == parseInt(xcoord) && cordY == parseInt(ycoord))
	{
		return true;
	}else{
		return false;
	}
 }
function right(x, y)//check right
	{
	
 	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX + 100 == parseInt(xcoord) && cordY == parseInt(ycoord))
	{
		return true;
	}else{
		return false;
	}
 }
function up(x, y)//check above
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX == parseInt(xcoord) && cordY - 100 == parseInt(ycoord))
	{
		return true;
	}else{
		return false;
	}
 }
function down(x, y)//check below
{
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX == parseInt(xcoord) && cordY + 100 == parseInt(ycoord))
	{
		return true;
	}else{
		return false;
	}
 }
function swap (x, y) //moves the pieces by switching position with the blank space
{
	for (var i = 0; i < puzzlesquare.length; i++){
		if(parseInt(puzzlesquare[i].style.left) == x && parseInt(puzzlesquare[i].style.top) == y){
			position = i;
			break;
		}
	}
	var temp = puzzlesquare[position].style.top;

	puzzlesquare[position].style.top = ycoord;
	
	ycoord = temp;
	
	temp = puzzlesquare[position].style.left;
	
	puzzlesquare[position].style.left = xcoord;
	
	xcoord = temp;
}
function win() //checks if the puzzle has been fixed
{
	var finish = true;
	for (var i = 0; i < puzzlesquare.length; i++) //for each puzzle piece 
	{
		var checkTop = parseInt(puzzlesquare[i].style.top);
		var checkLeft = parseInt(puzzlesquare[i].style.left);

		if (checkLeft != (i%4*100) || checkTop != parseInt(i/4)*100) //checks if each piece matches its left and top position
		{	
			finish = false;
	 		break;
		}
	}

	return finish;

}
function notify()//alert message
{
	alert("Congratulations! You solved the puzzle!");
}
function randomInt(min, max)//randomize function
{
  return Math.floor(Math.random() * (max - min) ) + min;
}