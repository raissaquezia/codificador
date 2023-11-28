//e - enter
//o - ober
//i - imes
//a - ai
//u - ufat

const crip = document.getElementById("crip");
const descrip = document.getElementById("descrip");
const copiar = document.getElementById("copiar");
const textoInicial = document.getElementById("input");
const textFinal = document.getElementById("mensagemFinal");
const imagem = document.getElementById("retangulo__img");
const textInfo = document.getElementById("retangulo__subtitulo");
const retangulo = document. getElementById("retangulo");
	
const remplace = (newvalue) => {
	textFinal.innerHTML = newvalue;
	textFinal.classList.add("ajustar");
	textoInicial.value = "";
	textoInicial.style.height = ("auto")
	textoInicial.placeholder = ("Digite o texto aqui");
	imagem.classList.add("ocultar");
	textInfo.classList.add("ocultar");
}

const reset = () => {
	textoInicial.value = "";
    textoInicial.style.height = "auto";
	textFinal.innerHTML = "";
	textFinal.classList.remove("ajustar");
	imagem.classList.remove("ocultar");
	textFinal.placeholder = "Nenhuma mensagem foi encontrada";
	textInfo.classList.remove("ocultar")
	copiar.classList.add("bn_ocultar");
	textoInicial.focus();
};

let remplazar = [
	["e", "enter"],
	["o", "ober"],
	["i", "imes"],
	["a", "ai"],
	["u", "ufat"]
];

crip.addEventListener('click', () => {

	const texto = textoInicial.value.toLowerCase();

	if (texto != "") {
		function crip(newtext) {
			for (let i = 0; i < remplazar.length; i++) {
				if (newtext.includes(remplazar[i][0])) {
					newtext = newtext.replaceAll(remplazar[i][0], remplazar[i][1]);
				};
			};
			return newtext;
		};
		remplace(crip(texto));
	} else {
		alert("Digite o texto aqui");
		reset();
	};
    imagem.style.display = "none";
    textInfo.style.display = "none";
    copiar.style.display = "block";
    retangulo.classList.add("ajustar");
});

descrip.addEventListener('click', () => {

	const texto = textoInicial.value.toLowerCase();

	if (texto != "") {
		function descrip(newtext) {
			for (let i = 0; i < remplazar.length; i++) {
				if (newtext.includes(remplazar[i][1])) {
					newtext = newtext.replaceAll(remplazar[i][1], remplazar[i][0]);
				};
			};
			return newtext;
		};
		remplace(descrip(texto));
	} else {
		alert("Digite o código para descriptografar");
		reset();
	};
    imagem.style.display = "none";
    textInfo.style.display = "none";
    copiar.style.display = "block";
    retangulo.classList.add("ajustar");
});

copiarButton.addEventListener("click", () => {
    let texto = textFinalElement.innerText;
    navigator.clipboard.writeText(texto);
    alert("Texto Copiado");
    reset(); // Certifique-se de que a função reset() está definida em algum lugar do seu código
});
//auto ajuste de textarea
textoInicial.addEventListener("change", e => {
	textoInicial.style.height = "auto";
	let scHeight = e.target.scrollHeight;
	textoInicial.style.height = `${scHeight}px`;
});
textoInicial.addEventListener("keyup", e => {
	textoInicial.style.height = "auto";
	let scHeight = e.target.scrollHeight;
	textoInicial.style.height = `${scHeight}px`;
});