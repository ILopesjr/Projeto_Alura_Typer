$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        }, 2500);
    })
}

function trocaFraseAleatoria(data){
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhofrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}