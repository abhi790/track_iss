const url = 'scenery.jpg';
const btn = document.getElementById("btn");
const img = document.getElementById("img");
async function getImage(){
    await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(result => {
        console.log(result);
        Image.src = result.message;
    })
    .catch(err => console.log(err));

}

btn.addEventListener('click', getImage);
