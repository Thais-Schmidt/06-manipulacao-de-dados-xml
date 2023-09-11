function loadXMLDoc() {
    //XMLHttpRequest serve para interagir com servidores;
    var xmlDoc = new XMLHttpRequest();
    xmlDoc.onreadystatechange = function () {
        if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
            leituraArquivo(xmlDoc);
        }
    }

    xmlDoc.open("GET", "dados/carros.xml");
    xmlDoc.send();
}

loadXMLDoc();

function leituraArquivo(xml) {
    var i;
    var xmlArquivo = xml.responseXML;
    //console.log(xml);
    var table =
        `<tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Placa</th>
            <th>Quantidade</th>
        </tr>`;

    // console.log(xmlArquivo);
    var arquivo = xmlArquivo.getElementsByTagName("veiculo");
    console.log(arquivo);
    for (i = 0; i < arquivo.length; i++) {
        //A propriedade nodeValue retorna o valor de um nó
        //Para retornar o texto de um elemento é necessário retornar o valor do 
        //nó (element.childNodes[0].nodeValue)
        table +=
            `<tr>
        <td>${arquivo[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue}</td>
        <td>${arquivo[i].getElementsByTagName("modelo")[0].childNodes[0].nodeValue}</td>
        <td>${arquivo[i].getElementsByTagName("ano")[0].childNodes[0].nodeValue}</td>
        <td>${arquivo[i].getElementsByTagName("cor")[0].childNodes[0].nodeValue}</td>
        <td>${arquivo[i].getElementsByTagName("placa")[0].childNodes[0].nodeValue}</td>
        <td>${arquivo[i].getElementsByTagName("quantidade")[0].childNodes[0].nodeValue}</td>
        </tr>`
    }

    document.getElementById('tbl1').innerHTML = table;
}


//LEITURA DE XML UTILIZANDO JQUERY

var table =
    `<tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Placa</th>
            <th>Quantidade</th>
        </tr>`;

let url = "dados/carros.xml";

$.ajax(url)
    .done(function(carros){
        $(carros).find('veiculo').each(function(){
            table +=
            `<tr>
            <td>${$(this).find('marca').text()}</td>
            <td>${$(this).find('modelo').text()}</td>
            <td>${$(this).find('ano').text()}</td>
            <td>${$(this).find('cor').text()}</td>
            <td>${$(this).find('placa').text()}</td>
            <td>${$(this).find('quantidade').text()}</td>
            </tr>`
        })
        document.getElementById('tbl2').innerHTML = table;
    })
    .fail(function(){
        alert("Ocorreu um erro na leitura do arquivo XML");    
    })