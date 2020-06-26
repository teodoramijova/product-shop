const products = [
	{id: 1,title: 'LenovoThinkpad x280', price: 1000.00, qty: 1, image: './img/ThinkPad_x280.png'},  
	{id: 2,title: 'Apple Macbook Pro',price: 2500.00, qty: 1,image: './img/MacBook-Pro.png'},  
	{id: 3,title: 'Amazon Kindle Ebook',price: 150.00,qty: 1,image: './img/Amazon_Kindle.png'},  
	{id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './img/usbC_to_hdmi.jpg'},  
];

new Vue({
	el:"#app",
	data:{
		products,
		cartItems: [],
	},
	methods:{
		addToCart(item){
			if (!this.alreadyThere(item.id)){
				this.cartItems = [...this.cartItems, {...item}];
			} else {
				
				var index = this.cartItems.findIndex((itemInArray)=>{
					return item.id === itemInArray.id
				})
				this.cartItems[index].qty += item.qty;
				item.qty = 1;
			}
		},
		alreadyThere(id){
			let isThere = false;
			this.cartItems.forEach((item)=>{
				if(item.id === id){
					isThere = true;
				}
			})

			return isThere;
		},
		
	},
	
})

Vue.component('shopping-cart',{
	props:{
		items: [],
	},
	computed: {
		Total(){
			let total = 0;
			this.items.forEach((item)=>{
				total += item.qty * item.price;
			})

			return total;
		}
	},
	methods:{
		removeItem(id){
			var index = this.items.findIndex((itemInArray)=>{
				return id === itemInArray.id
			});
			this.items.splice(index,1);
		}
	}
	
});

Vue.component('item-vue',{

	template: '#cart-item-template',
	props:[
		'item'
	],
	data:{

	},
	methods:{
		removeItem(id){
			this.$parent.removeItem(id);
		}
		
	},
	filters: {
		capitalize: function (value) {
		  if (!value) return ''
		  value = value.toString()
		  return value.charAt(0).toUpperCase() + value.slice(1)
		},
	},
	computed:{

	},
	// render(createElement){
	// 	var self = this;
	// 	return createElement('tr',{},[ 
	// 		createElement('td',{}, this.item.title),
	// 		createElement('td',{
	// 			attrs: {
	// 				style: 'width:120px',
	// 			}
	// 		}, [ 
	// 			createElement('span',{
	// 				attrs: {
	// 					style: 'margin-left:10px'
	// 				}
	// 			},'QTY: '),
	// 			createElement('input',{
	// 					domProps: {
	// 						value: this.item.qty,
	// 						type: 'number',
	// 						min: '1',
	// 					}, 
	// 					on: { input(event) {  
	// 						self.item.qty = event.target.value; 
	// 					} },
	// 					class: {
	// 						'form-control': true,
	// 						'input-qty': true
	// 					},
	// 			})
	// 		]),
	// 		createElement('td',{
	// 			class: {
	// 				'text-right': true
	// 			}
	// 		}, `$${this.item.price}`),
	// 		createElement('td',{},[
	// 			createElement('button',{
	// 				on: {
	// 					click: function(){
	// 						self.removeItem(self.item.id)
	// 					}
	// 				}
	// 			}, [
	// 				createElement('span', 'Remove')
	// 			]),
	// 			]
	// 		)
	// 	]
	// 	)},
	mounted(){
		console.log(this.item);
	}

})



// Your Code goes here
