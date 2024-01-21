const url = "https://dolarapi.com/v1/dolares"

const quoteService = {

    data: async function() {
        await fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
  
    data.forEach(element => {
      if(element.casa == 'blue'){
        valorDolarblue = element.venta;
      }else if(element.casa == 'oficial'){
        valorDolarOf = element.venta
      }
    });
    return {valorDolarOf, valorDolarblue}

    // Cach al error por si falla la api
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error.message);
  });
  return {valorDolarOf, valorDolarblue}
    }
}

module.exports = quoteService;