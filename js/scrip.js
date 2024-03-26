//e - enter
//o - ober
//i - imes
//a - ai
//u - ufat

const copyButton = document.getElementById("copyButton");
const initialText = document.getElementById("input");
const finalText = document.getElementById("resultMessage");
const image = document.getElementById("result__image");
const textInfo = document.getElementById("resultInfo");
const result = document.getElementById("result");

const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");

/**
 * @description Evento de clique do botão de criptografia.
 */
encryptButton.addEventListener("click", () => {
    const inputValue = removeSpecialCharacters(initialText.value);

    if (inputValue && inputValue !== "") {
        const newValue = replaceText(inputValue, false);

        showResult(newValue);
        showToast('Criptografia realizada com sucesso!', false);
    } else {
        showToast('Por favor digite um texto para criptografar', true);
        restoreUI();
    }
});

/**
 * @description Evento de clique do botão de descriptografia.
 */
decryptButton.addEventListener("click", () => {
    const inputValue = initialText.value.toLowerCase();

    if (inputValue && inputValue !== "") {
        const newValue = replaceText(inputValue, true);

        showResult(newValue);
        showToast('Descriptografia realizada com sucesso!', false);
    } else {
        showToast('Por favor digite um texto para descriptografar', true);
        restoreUI();
    }
});

/**
 * @description Evento de clique do botão de copiar.
 */
copyButton.addEventListener("click", () => {
    const textToCopy = finalText.innerHTML;

    navigator.clipboard.writeText(textToCopy);
	
    showToast('Texto copiado!', false);
    restoreUI();

    removeResult();
});

/**
 * @description Ajusta dinamicamente a altura do textarea com base no conteúdo.
 * @returns {void}
 */
const adjustTextArea = () => {
    initialText.style.height = "auto";

    const scrollHeight = initialText.scrollHeight;

    initialText.style.height = `${scrollHeight}px`;
};

/**
 * @description Evento de mudança do conteúdo do textarea.
 */
initialText.addEventListener("change", adjustTextArea);
initialText.addEventListener("keyup", adjustTextArea);

/**
 * @description Remove o resultado da tela, adicionando ilustração e texto informativo.
 * @returns {void}
 */
const removeResult = () => {
    image.classList.remove("hide");
    textInfo.classList.remove("hide");
    copyButton.classList.add("hide");
    result.classList.add("adjust");
}

/**
 * @description Remove caracteres especiais do texto, deixando apenas letras minúsculas.
 * @operational 
 *  - O NFD irá decompor os caracteres acentuados em caracteres separados, por exemplo: á => a + ´
 *  - O Regex irá remover todos os caracteres que não sejam letras ou espaços.
 * @param {string} inputValue - O texto a ser processado.
 * @returns {string} O texto sem caracteres especiais.
 */
const removeSpecialCharacters = (inputValue) => {
    const normalizedValue = inputValue.normalize("NFD");
    const filteredValue = normalizedValue.replace(/[^a-zA-Zs]/g, "");
    const lowerCaseValue = filteredValue.toLowerCase();

    return lowerCaseValue;
}

/**
 * @description Restaura os elementos e estilos para o estado inicial.
 * @returns {void}
 */
const restoreUI = () => {
    initialText.value = "";
    initialText.style.height = "auto";
    finalText.innerHTML = "Nenhuma mensagem encontrada";
    finalText.classList.remove("adjust");
    image.classList.remove("hide");
    textInfo.classList.remove("hide");
    copyButton.classList.add("hide");
    initialText.focus();
};

/**
 * @description Exibe o resultado da operação na tela.
 * @param {string} newValue - O texto a ser exibido.
 * @returns {void}
 */
const showResult = (newValue) => {
	finalText.innerHTML = newValue;
	finalText.classList.add("adjust");
	initialText.value = "";
	initialText.style.height = ("auto")
	initialText.placeholder = ("Digite aqui seu texto");
	image.classList.add("hide");
	textInfo.classList.add("hide");
    copyButton.classList.remove("hide");
    
    result.classList.add("adjust");
}

/**
 * @description Exibe um toast na tela com uma mensagem de sucesso ou erro.
 * @param {string} message - A mensagem a ser exibida.
 * @param {boolean} error - Indica se a mensagem é de erro (true) ou sucesso (false).
 * @returns {void}
 */
const showToast = (message, error) => {
    // Seleciona o container do toast
    const toastContainer = document.getElementById('toastContainer');
    const toastClass = error ? 'error-toast' : 'success-toast';
  
    // Cria um novo elemento para o toast
    const toast = document.createElement('div');
    toast.classList.add(toastClass);
    toast.textContent = message;
  
    // Adiciona o toast ao container
    toastContainer.appendChild(toast);
  
    // Mostra o toast por 3 segundos e depois o remove
    setTimeout(() => {
      toast.remove();
    }, 3000);
  
    // Exibe o toast
    toast.style.display = 'block';
} 

/**
 * @description Realiza a substituição de caracteres de acordo com o modo de operação.
 * @param {string} inputValue - O texto a ser processado para criptografia ou descriptografia.
 * @param {boolean} isEncrypt - Indica se o processo é de criptografia (true) ou descriptografia (false).
 * @returns {string} O texto com os caracteres substituídos conforme a operação.
 */
const replaceText = (inputValue, isEncrypt) => {
    const encryptReference = {
        "e": "enter",
        "o": "ober",
        "i": "imes",
        "a": "ai",
        "u": "ufat"
    };

    const decryptReference = {
        "enter" : "e",
        "ober" : "o",
        "imes" : "i",
        "ai" : "a",
        "ufat" : "u"
    };

    const usedReference = isEncrypt ? decryptReference : encryptReference;
    const pattern = Object.keys(usedReference).join('|');
    const regex = new RegExp(pattern, 'g');

    const filteredValue = inputValue.replace(regex, match => usedReference[match]);

    return filteredValue;
};

/**
 * @description Referência de código utilizando um objeto tendo como base da solução a inversão das chaves e valores.
 */
const replaceText2 = (inputValue, isEncrypt) => {
    const replacements = {
        "e": "enter",
        "o": "ober",
        "i": "imes",
        "a": "ai",
        "u": "ufat"
    };

    const reverseReplacements = () => {
        const transform = Object.entries(replacements); // Transforma o objeto em um array de arrays (Matriz)
        const reverse = transform.map(([key, value]) => [value, key]); // Inverte a ordem dos elementos de cada array, desestruturando parâmetros
        // const reverse = transform.map(array => array.reverse()); // Faz a mesma coisa que o código acima, de maneira mais semântica
        const reverseObject = Object.fromEntries(reverse); // Transforma a matriz em um objeto novamente

        return reverseObject;
    };

    const usedReference = isEncrypt ? reverseReplacements() : replacements;
    const pattern = Object.keys(usedReference).join('|');
    const regex = new RegExp(pattern, 'g');

    const filteredValue = inputValue.replace(regex, match => usedReference[match]);

    return filteredValue;
};

/**
 * @description Referência de código utilizando uma Matriz, tendo como base da solução a validação do índice do elemento encontrado.
 */
const replaceText3 = (inputValue, isEncrypt) => {

    const replacements = [
        ["ai", "enter", "imes", "ober", "ufat"], 
        ["a", "e", "i", "o", "u"]
    ];
    const inputReference = isEncrypt ? 0 : 1;
    const outputReplacement = isEncrypt ? 1 : 0;

    const pattern = replacements[inputReference].join('|');
    const regex = new RegExp(pattern, 'g');

    const filteredValue = inputValue.replace(regex, match => {
        const replacementIndex = replacements[inputReference].indexOf(match);
        const replacementValue = replacements[outputReplacement][replacementIndex];

        return replacementValue;
    });

    return filteredValue;
};
