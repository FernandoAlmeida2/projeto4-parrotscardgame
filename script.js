let contadorDeCartas = 0;
let cartasNum = -1;
let arrayParrot = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot',
 'tripletsparrot', 'unicornparrot'];

//Pede o número de cartas via prompt
let contadorPrompt = 1;
while((cartasNum % 2 != 0) || (cartasNum < 4 || cartasNum > 14)){    
    if(contadorPrompt == 1)
        cartasNum = prompt('Digite um número par de cartas (min: 4, max: 14):');
    else if(contadorPrompt == 2)
        cartasNum = prompt('Eu disse número par entre 4 e 14 -_- :');
        else if(contadorPrompt == 3)
            cartasNum = prompt('Bora, deixa de leseira, vou repetir mais não, número par entre 4 e 14:');
            else cartasNum = prompt('Mentira, vou repetir só mais uma vez, número par entre 4 e 14:');
    contadorPrompt++;
}

//Cria um subarray de arrayParrot com o número cartas distintas escolhidas pelo usuário
let subArrayParrot = arrayParrot.slice(0,cartasNum/2);

//Duplica o subarray já que há um par cartas de cada parrot
subArrayParrot = subArrayParrot.concat(subArrayParrot);

//Embaralha o subarray para que as cartas sejam criadas em ordem aleatória
subArrayParrot = subArrayParrot.sort(comparador);

//Finalmente cria as cartas daquela instância do jogo
let contador;
for(contador = 0; contador < subArrayParrot.length; contador++){
    CriaCarta(subArrayParrot[contador]);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function viraCarta(cartaClicada){
    faceFrente = cartaClicada.children[0];
    faceVerso = cartaClicada.children[1];
    faceFrente.classList.toggle('flip');
    faceVerso.classList.toggle('flip');

}

function CriaCarta (figura){
    div_Cartas = document.querySelector('.cartas');
    div_Cartas.innerHTML += 
    `<div class="carta carta${contadorDeCartas + 1}" onclick = "viraCarta(this)">
        <div class="face frente">
            <img src="./imagens/front.png" alt="Não foi possível carregar a imagem"/>
        </div>
        <div class="face verso flip">
            <img src="./imagens/${figura}.gif" alt="Não foi possível carregar a imagem"/>
        </div>
    </div>`;
    contadorDeCartas++;
}

