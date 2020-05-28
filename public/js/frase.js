$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $(".spinner").show();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        }, 2500);
    }).always(function(){
        $(".spinner").toggle();
    });
}

function trocaFraseAleatoria(data){
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhofrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $(".spinner").show();

    let fraseId = $(".frase-id").val()-1;
    let dados = { id: fraseId}

    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        }, 2500);
    }).always(function(){
        $(".spinner").toggle();
    });
}

function trocaFrase(data){
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhofrase();
    atualizaTempoInicial(data.tempo);
}