
                // Declaração das variáveis globais

let cartasNum = 0;
let arrayParrot = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot',
 'tripletsparrot', 'unicornparrot'];
let cartaViradaAnterior = null;
let cartasCertasViradas = 0;
let numJogadas = 0;
let conta_Segundos = 0;
let meu_Intervalo;

                //função que gera números aleatórios no intervalo [-0.5, 0.5] usada no sorteio das cartas

function comparador() { 

	return Math.random() - 0.5; 

}

            // Início das funções para o relógio da questão bônus

function atualiza_Relogio(){

    const contador_Relogio = document.querySelector('.relogio').lastElementChild; 
    contador_Relogio.innerHTML = `${conta_Segundos + 1}`; 

    conta_Segundos++;
}

function liga_Relogio(){

    meu_Intervalo = setInterval(atualiza_Relogio, 1000);
}

function para_Relogio(){

    clearInterval(meu_Intervalo);
}

function reseta_Relogio(){

    const contador_Relogio = document.querySelector('.relogio').lastElementChild;
    contador_Relogio.innerHTML = '';
}

            // Fim das funções para o relógio da questão bônus

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
    for( let contador = 0; contador < subArrayParrot.length; contador++){
        CriaCarta(subArrayParrot[contador]);
    }
    liga_Relogio();
}


function encerraJogo(){  

    //limpa todas as cartas da partida anterior

    const cartas = document.querySelector('.cartas');
    cartas.innerHTML = "";
    
    //reseta as variáveis de contagem da partida anterior
    cartasNum = 0;
    cartasCertasViradas = 0;
    numJogadas = 0;
    conta_Segundos = 0;
    reseta_Relogio();
}



function pergunta_Jogar_Novamente (){

    let resposta = null;

    while(resposta !== 'sim' && resposta !== 'não'){
        resposta = prompt("Deseja começar uma nova partida? \n(sim/não):");
    }

    encerraJogo();

    if (resposta == "sim")
        iniciaJogo();
}


function venceuJogo (){

    alert(`Você ganhou em ${numJogadas} jogadas e em ${conta_Segundos} segundos!`);

    pergunta_Jogar_Novamente();
}


function abandonar_Partida(){

    let resposta = null;

    while(resposta !== 'sim' && resposta !== 'não'){
        resposta = prompt("Tem certeza que deseja encerrar a partida? \n(sim/não):");
    }

    if (resposta == "sim"){
        encerraJogo();
        pergunta_Jogar_Novamente();
    }
}

function bloqueia_Cliques (){
    const cartas = document.querySelectorAll('.carta');
    for(let i = 0; i < cartas.length; i++){
        cartas[i].setAttribute('onclick', '');
    }
}

function habilita_Cliques (){
    const cartas = document.querySelectorAll('.carta');
    for(let i = 0; i < cartas.length; i++){
        cartas[i].setAttribute('onclick', 'viraCarta(this)');
    }
}


function viraCarta(cartaClicada){

    faceFrente = cartaClicada.children[0];
    faceVerso = cartaClicada.children[1];

    if(faceFrente.classList.contains('flip') == false){

        faceFrente.classList.add('flip');
        faceVerso.classList.remove('flip');
        numJogadas ++;

                /* Quando duas cartas foram viradas no turno, verifica se elas são iguais: se sim, deixa-as viradas;
                caso contrário, desvira-as para a posição inicial; */

        if(cartaViradaAnterior != null){
            bloqueia_Cliques();
            
            if (cartaClicada.isEqualNode(cartaViradaAnterior) == false){
                const faceFrenteAnterior = cartaViradaAnterior.children[0];
                const faceVersoAnterior = cartaViradaAnterior.children[1];
                setTimeout(function()
                { 
                    faceFrenteAnterior.classList.remove('flip');
                    faceVersoAnterior.classList.add('flip');
                    faceFrente.classList.remove('flip');
                    faceVerso.classList.add('flip');
                    habilita_Cliques();
                }
                , 1000);
            }

            else{
                cartasCertasViradas += 2;

                if (cartasCertasViradas == cartasNum){
                    para_Relogio();
                    setTimeout(venceuJogo, 1000);

                }
                habilita_Cliques();
            }
            cartaViradaAnterior = null;
        }

        else
            cartaViradaAnterior = cartaClicada;
    }

}

iniciaJogo();



