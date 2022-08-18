let contadorDeCartas = 0;
let cartasNum = -1;
let arrayParrot = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot',
 'tripletsparrot', 'unicornparrot'];
let cartaViradaAnterior = null;
let cartasCertasViradas = 0;
let numJogadas = 0;
let conta_Segundos = 0;
let meu_Intervalo;

function comparador() { 
	return Math.random() - 0.5; 
}


function atualiza_Relogio(){
    const contador_Relogio = document.querySelector('.relogio').lastElementChild; 
    contador_Relogio.innerHTML = `${conta_Segundos + 1}`; 
     
    console.log(conta_Segundos + ' ');
    conta_Segundos++;
}

function para_relogio(){
    clearInterval(meu_Intervalo);
}

function CriaCarta (figura){
    div_Cartas = document.querySelector('.cartas');
    div_Cartas.innerHTML += 
    `<div class="carta carta-${figura}" onclick = "viraCarta(this)">
        <div class="face frente">
            <img src="./imagens/front.png" alt="Não foi possível carregar a imagem"/>
        </div>
        <div class="face verso flip">
            <img src="./imagens/${figura}.gif" alt="Não foi possível carregar a imagem"/>
        </div>
    </div>`;
    contadorDeCartas++;
}

function iniciaJogo(){
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
}

function viraCarta(cartaClicada){
    faceFrente = cartaClicada.children[0];
    faceVerso = cartaClicada.children[1];
    if(faceFrente.classList.contains('flip') == false){
        faceFrente.classList.add('flip');
        faceVerso.classList.remove('flip');
        numJogadas ++;
        //Quando duas cartas foram viradas no turno, verifica se elas são iguais: se sim, deixa-as viradas;
        //caso contrário, desvira-as para a posição inicial;
        console.log(cartaViradaAnterior);
        if(cartaViradaAnterior != null){
            if (cartaClicada.isEqualNode(cartaViradaAnterior) == false){
                const faceFrenteAnterior = cartaViradaAnterior.children[0];
                const faceVersoAnterior = cartaViradaAnterior.children[1];
                setTimeout(function(){ 
                faceFrenteAnterior.classList.remove('flip');
                faceVersoAnterior.classList.add('flip');
                faceFrente.classList.remove('flip');
                faceVerso.classList.add('flip');
                }, 1000);
            }
            else{
                cartasCertasViradas += 2;
                if (cartasCertasViradas == cartasNum){
                    para_relogio();
                    setTimeout(function(){ 
                        alert(`Você ganhou em ${numJogadas} jogadas e em ${conta_Segundos} segundos!`);
                        }, 1000);
                }
            }
            cartaViradaAnterior = null;
        }
        else
            cartaViradaAnterior = cartaClicada;
    }

}

iniciaJogo();

meu_Intervalo = setInterval(atualiza_Relogio, 1000);



