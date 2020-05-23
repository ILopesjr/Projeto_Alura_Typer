var tempoinicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhofrase();
    inicializarContadores();
    inicializarCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reniciarJogo);
});

function atualizaTempoInicial(tempo){
    tempoinicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhofrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializarContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializarCronometro() {
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(() => {
        tempoRestante--;
        $('#tempo-digitacao').text(tempoRestante);
        if (tempoRestante < 1) {
            clearInterval(cronometroID);
            finalizaJogo();
        }
    }, 1000);
});
}

function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado =  campo.val();
        var comparavel = frase.substr(0, digitado.length);

    if(frase.startsWith(digitado)){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
    });
}

function finalizaJogo(){
    campo.attr('disabled', true);
    $("#botao-reiniciar").attr("disabled",false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reniciarJogo(){
    campo.attr('disabled', false);
    campo.val("");
    $('#contador-caracteres').text("0");
    $('#contador-palavras').text("0");
    $("#tempo-digitacao").text(tempoinicial);
    inicializarCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}