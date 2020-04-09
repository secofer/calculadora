var calculadora = {
	
	visor: document.getElementById("display"),
	pantalla: "0",
	operacion: "",
	valor1: 0,
	valor2: 0,
	ultimo: 0,
	resultado: 0,
	finalizar: false,
	
	init: (function(){
		this.eventosBotones(".tecla");
		this.eventosFuncion();
	}),
	
	//Eventos de formato de botones
	
	
	eventosBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoreducir;
			x[i].onmouseleave = this.eventoaumentar;
		};
	},

	eventoreducir: function(event){
		calculadora.reducir(event.target);
	},

	eventoaumentar: function(event){
		calculadora.aumentar(event.target);
	},
	
	//Formato de botones 
	
	reducir: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	aumentar: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	eventosFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.numero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.numero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.numero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.numero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.numero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.numero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.numero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.numero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.numero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.numero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrar();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.signo();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.decimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.operador("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.operador("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.operador("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.operador("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.operador("+");});
	},
	
	numero: function(valor){
		if (this.pantalla.length < 8) {
		
			if (this.pantalla=="0") {
				this.pantalla = "";
				this.pantalla = this.pantalla + valor;
			} else {
				this.pantalla = this.pantalla + valor;
			}
		this.actualizar();
		}
	},
	
	borrar: function(){ 

	    this.pantalla = "0";
		this.operacion = "";
		this.valor1 = 0;
		this.valor2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.finalizar = false;
		this.ultimo = 0;
		this.actualizar();
	},
	
	signo: function(){
		if (this.pantalla !="0") {
			var aux;
			if (this.pantalla.charAt(0)=="-") {
				aux = this.pantalla.slice(1);
			}	else {
				aux = "-" + this.pantalla;
			}
		this.pantalla = "";
		this.pantalla = aux;
		this.actualizar();
		}
	},
	
	decimal: function(){
		if (this.pantalla.indexOf(".")== -1) {
			if (this.pantalla == ""){
				this.pantalla = this.pantalla + "0.";
			} else {
				this.pantalla = this.pantalla + ".";
			}
			this.actualizar();
		}
	},
	
	verResultado: function(){

		if(!this.finalizar){ 
			this.valor2 = parseFloat(this.pantalla);
			this.ultimo = this.valor2;
			this.ejecutar(this.valor1, this.valor2, this.operacion);
		
		} else {
			this.ejecutar(this.valor1, this.ultimo, this.operacion);
		}
	
		this.valor1 = this.resultado;
		this.pantalla = "";
	
		if (this.resultado.toString().length < 9){
			this.pantalla = this.resultado.toString();
		} else {
			this.pantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.finalizar = true;		
		this.actualizar();
	
	},
	
		operador: function(oper){
		this.valor1 = parseFloat(this.pantalla);
		this.pantalla = "";
		this.operacion = oper;
		this.finalizar = false;
		this.actualizar();
	},
	
	ejecutar: function(valor1, valor2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(valor1 + valor2);
			break;
			case "-": 
				this.resultado = eval(valor1 - valor2);
			break;
			case "*": 
				this.resultado = eval(valor1 * valor2);
			break;
			case "/": 
				this.resultado = eval(valor1 / valor2);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valor1));
		}
	},
	
	actualizar: function(){
		this.visor.innerHTML = this.pantalla;
	}
	
};

calculadora.init();