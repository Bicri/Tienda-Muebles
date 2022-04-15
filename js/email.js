const enviarCorreo = async (formulario) => {
    /* let peticion = {"nombre":"Angel","destino":"correo@gmail.com","asunto":"asunto",
      "numero":"51","mensaje":"Cuerpo del mensaje"}; */ 
    try {
        
      const resp = await fetch("php/email.php", {
        method: "POST", // or 'PUT'
        body: formulario,
      });
      if (!resp.ok)
        throw { status: resp.status, statusText: resp.statusText };
      const respuestajson = await resp.json();
      
      return respuestajson;
    } catch (error) {
      return error;
    }
  };
 
  const formulario = document.querySelector("#formularioEmail");
  const alerta = document.querySelector("#alerta");
  //console.log(formulario[0].value)
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let formularioDatos = new FormData(formulario);
    //console.log(formularioDatos.get("destino"))
    enviarCorreo(formularioDatos)
      .then((response) => {      
        console.log(response);          
        alerta.textContent = response;          
        if (response!="Correo enviado con éxito")
        throw { status: response.status, statusText: response.statusText }  
      })
      .catch((err) => {
          alerta.textContent = err.status + " " + err.statusText + " No se envió el mensaje";
          alerta.style.backgroundColor="red";
          alerta.style.color="black";
      });
  });