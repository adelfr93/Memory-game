document.querySelector(".control-buttons span").onclick = function(){

    let yourName = prompt("What's your name");

    if(yourName == null || yourName == ""){
        document.querySelector(".info-container .name span").innerHTML = "Unkown";
    }else{
        document.querySelector(".info-container .name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();
}


let duration = 1000;

let blockContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockContainer.children);

//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block,index)=>{

    block.style.order = orderRange[index];

    // Add click envent
    block.addEventListener("click",()=>{
        flipBlock(block);
    })

})

// flip block function
function flipBlock(selectedBlock){
    //Add class is-flipped
    selectedBlock.classList.add("is-flipped");

    // Collect all flipped blocks
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    // if there is two slected blocks
    if(allFlippedBlocks.length === 2){
       
       // stop clickking function
        stopClicking();

        // check matched block function
        checkMatchedBlocks(allFlippedBlocks);
    }

}

function checkMatchedBlocks(allFlipped){

    let firstBlock = allFlipped[0];
    let secondBlock = allFlipped[1];

    let triesElement = document.querySelector(".tries span");

    //check if 2 blocks flipped have the same data-technology

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        
        // remove two blocks from array allFlipped
        
            allFlipped.forEach(blockFlipped => blockFlipped.classList.add("has-match"));
            allFlipped.forEach(blockFlipped => blockFlipped.classList.remove("is-flipped"));
     
    }else{

        // Add number of tries
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        // remove class is-flipped
        setTimeout(() => {
            allFlipped.forEach(blockFlipped => blockFlipped.classList.remove("is-flipped"));
        },duration);
        
    }
    
}

function stopClicking(){
    // Add class no clicking to container block
    blockContainer.classList.add("no-clicking");

    // remove class no clinking after duration
    setTimeout(()=>{
        blockContainer.classList.remove("no-clicking");
    },duration);
}

// shuffle function

function shuffle(array){
    // Settings vars
    let current = array.length,
        random,
        temp;

    while(current > 0){

        // get random number
        random = Math.floor(Math.random() * current);

        // decrease length by one
        current--;

        //[1]
        temp = array[current];

        //[2]
        array[current] = array[random];

        //[3]
        array[random] = temp;

    }

    return array;

}