//import axios from 'axios';
let axios = require ('axios')
const TeleBot = require('telebot');
const ENDPOINT_GET_PRODUCT = 'https://fakestoreapi.com/products'
//------------------------------------------------------------ BOTONES ---------------------------------------------
const BUTTONS = {
  product: {
      label: '🧾 Mostrar productos',
      command: '/Mostrar_productos'
  },
  help: {
      label: '❓ Ayuda',
      command: '/help'
  },
 payment: {
      label: '💳 metodos de pago',
      command: '/payment'
  },
  autor: {
      label: 'autor',
      command: '/autor'
  },
  criptomonedas: {
      label: '₿ Criptomonedas',
      command: '/Bitcoin'
  },
  efectivo: {
      label: ' 💵 Efectivo',
      command: '/efectivo'
  },
  Bank: {
      label: '🏦 Bank transfer',
      command: '/bank'
  },
  volver: {
    label: '🔙Volver al menu',
    command: '/start'
  },
  buscarProducto: {
    label: '🔍Buscar producto',
    command: '/buscar_producto'
  },
  agregarAlCarrito: {
    label: '🛒 Agregar al carrito',
    command: '/agregar'
  }

};
//----------------------------------------------------------------------------------------------------------
//--------------------------------------------------------INIT BOT ------------------------------------------
const bot = new TeleBot({
  token: '5429834435:AAFQjusO4oNBuJO5XlGMYcOo5-_S38Epvk8',
  usePlugins: ['namedButtons'],
  pluginConfig: {
      namedButtons: {
          buttons: BUTTONS
      }
  }
});
//----------------------------------------------------------------------------------------------------------
//-----------------------------------------------ACCIONES DEL BOT-------------------------------------------
bot.on(['/start', '/hello'], (msg) => msg.reply.text(`👋🏻 Bienvenido a nuestra tienda!.`));
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

      #️⃣Codigo del producto: ${item.id}

      🏷️Nombre del producto: ${item.title}
      
      📎Categoria: ${item.category}
      
      📄Descripcion: ${item.description}
      ${item.image}`

      return bot.sendMessage(msg.chat.id,` ${info}`, );  
     } catch (error) {
      console.log(error);
    }
  }getInfoProductData(6)

});
bot.connect();