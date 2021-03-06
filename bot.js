//import axios from 'axios';
let axios = require ('axios')
const TeleBot = require('telebot');
const ENDPOINT_GET_PRODUCT = 'https://fakestoreapi.com/products'
const ENDPOINT_GET_DATA_PRODUCT = 'https://fakestoreapi.com/products/'
//------------------------------------------------------------ BOTONES ---------------------------------------------
const BUTTONS = {
  product: {
      label: '๐งพ Mostrar productos',
      command: '/Mostrar_productos'
  },
  help: {
      label: 'โ Ayuda',
      command: '/help'
  },
 payment: {
      label: '๐ณ metodos de pago',
      command: '/payment'
  },
  autor: {
      label: 'autor',
      command: '/autor'
  },
  criptomonedas: {
      label: 'โฟ Criptomonedas',
      command: '/Bitcoin'
  },
  efectivo: {
      label: ' ๐ต Efectivo',
      command: '/efectivo'
  },
  Bank: {
      label: '๐ฆ Bank transfer',
      command: '/bank'
  },
  volver: {
    label: '๐Volver al menu',
    command: '/start'
  },
  buscarProducto: {
    label: '๐Buscar producto',
    command: '/buscar_producto'
  },
  agregarAlCarrito: {
    label: '๐ Agregar al carrito',
    command: '/agregar'
  }

};
//----------------------------------------------------------------------------------------------------------
//--------------------------------------------------------INIT BOT ------------------------------------------
const bot = new TeleBot({
  token: 'TU_TOKEN_BOT_AQUI',
  usePlugins: ['namedButtons'],
  pluginConfig: {
      namedButtons: {
          buttons: BUTTONS
      }
  }
});
//----------------------------------------------------------------------------------------------------------
//-----------------------------------------------ACCIONES DEL BOT-------------------------------------------
bot.on(['/start', '/hello'], (msg) => msg.reply.text(`๐๐ป Bienvenido a nuestra tienda!.`));
bot.on('/help', (msg) => msg.reply.text('Este bot fue creado para tomar pedidos de una tienda. Busca los productos que deseas comprar y agregalo a tu pedido'))
bot.on('/autor',(msg)=>msg.reply.text('Realizado por @jgalvis414. Todos los derechos reservados.'))
bot.on('/start', (msg) => {

    let replyMarkup = bot.keyboard([
        [BUTTONS.product.label, BUTTONS.help.label],
        [BUTTONS.payment.label, BUTTONS.autor.label]
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Nuestro menu.', {replyMarkup});

});
bot.on('/payment', (msg) => {
 //  msg.reply.text('estoy en payment')
   let replyMarkup = bot.keyboard([
      [BUTTONS.criptomonedas.label, BUTTONS.efectivo.label],
      [BUTTONS.Bank.label, BUTTONS.volver.label]
  ], {resize: true});
  return bot.sendMessage(msg.from.id, 'Selecciona un metodo de pago:', {replyMarkup});
});
bot.on(['/Mostrar_productos'], function (msg) {
    async function getProductData() {
        try {
          const response = await axios.get(ENDPOINT_GET_PRODUCT);
          let item = response.data;
          let resultado = ``;
          let len = item.length;
          let i=0;
          for (;i<len;i++){
            resultado += `${item[i].id}) $${item[i].price} - ${item[i].title.substring(0,16)}\n`;
            }
            return bot.sendMessage(msg.chat.id,` ${resultado}`);  
         } catch (error) {
          console.log(error);
        }
      }getProductData()
      let replyMarkup = bot.keyboard([
        [BUTTONS.buscarProducto.label, BUTTONS.agregarAlCarrito.label],
        [BUTTONS.volver.label]
    ], {resize: true});
  
      return bot.sendMessage(msg.from.id, 'Lista de productos: ', {replyMarkup});
});
//----------------------------------------BUSCAR PRODUCTO-----------------------------------
bot.on(['/buscar_producto'], function (msg) {
  async function getInfoProductData(idx) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${idx}`);
      let item = response.data;
      let resultado = item;
      let info = `Resultado de la busqueda:
      ______________________________

      #๏ธโฃCodigo del producto: ${item.id}

      ๐ท๏ธNombre del producto: ${item.title}
      
      ๐Categoria: ${item.category}
      
      ๐Descripcion: ${item.description}
      ${item.image}`

      return bot.sendMessage(msg.chat.id,` ${info}`, );  
     } catch (error) {
      console.log(error);
    }
  }getInfoProductData(6)

});
bot.connect();