$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody")
    var usuario = "Ivanildo"
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({
        scrollTop:  posicaoPlacar
    }, 1000)
}

function novaLinha(usuario, numPalavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    }, 1000);
    
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
    scrollPlacar();
}

function sincronizaPlacar(){
    let placar = [];
    let linhas = $("tbody>tr");

    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let pontos = $(this).find("td:nth-child(2)").text();
        

        let score = {
            usuario: usuario,
            pontos: pontos
        };

        placar.push(score)
    });

    let dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Salvando o placar no servidor")
    } )
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);
<<<<<<< HEAD
            linha.find(".botao-remover").click(removeLinha);
=======
>>>>>>> 3bd6463237b8737310dfb62eddee2d6ac980c43c
            $("tbody").append(linha);
        });
    })
}