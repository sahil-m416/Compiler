function handleCompile(){
    var textArea = document.getElementById("textArea");
    var lang = document.getElementById("selectLanguage");
    var outputArea= document.getElementById("outputArea");
    var code = textArea.value;
    var codeId = lang.value;
    console.log(code);
    console.log(codeId);
    getOutput(code, codeId);
}

function getOutput(code, codeId) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({code:code, langId: codeId}))    
    request.addEventListener("load", function(event){
      var  coderId = JSON.parse(event.target.responseText);
      var mainCoderId = coderId.codeId;
      console.log(mainCoderId)
      console.log(coderId.codeId)
      setTimeout(function(){
        getRequestInterval(mainCoderId)},2000);
    })
     clearInterval(setTimeout)
}


function getRequestInterval(mainCoderId){

  var request = new XMLHttpRequest();
  request.open("GET", `https://codequotient.com/api/codeResult/${mainCoderId}`)
  request.setRequestHeader("Content-Type", "application/json");
  request.send();

  request.addEventListener('load', function(event){
    var mainData = JSON.parse(event.target.responseText)
    mainData = JSON.parse(mainData.data)
    if(mainData.output !== '')
    {
      outputArea.innerText    = mainData.output;
    }
    else{
      outputArea.innerText = mainData.errors;
    }
  })
  }
