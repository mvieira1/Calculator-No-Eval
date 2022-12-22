document.addEventListener('DOMContentLoaded', () => {

    class Calculator{
        constructor(previous_, current_){
            this.previous = previous_;
            this.current = current_;
            //{previous: previous_, current: current_}
            //{previous: '', current: ''}
        };

        //Instance Methods
        clearAll(){
            this.previous = '';
            this.current = ''; //atualizo a INSTÂNCIA DO OBJETO, atribuindo um novo value a cada uma das propriedades. Não altero, miraculosamente, os innerText do previousDisplay e currentDisplay :)
            //this.updateDisplay(); //atualizo o display (podia ter escrito aqui, mas optei por fazê-lo fora da class)
            this.operator = '';
        };

        clearEntry(){
            this.current = this.current.slice(0,-1);
        };

        addNumber(num_){
            //se clicar num button com um '.' e se já tiver sido, previamente, clicado, pára a execução do método, i.e., não o adiciono de novo
            if(num_ === '.' && this.current.includes('.')) return;
            this.current += num_;
        };

        operation(operator_){
            //assim que clicamos num button que se destina à execução de uma operação, o currentDisplay.innerText é escrito para o previous.innerText e o primeiro esvaziado
            // Porém, isto não acontece SE o current estiver vazio (Não faz sentido começar uma conta com uma operação... faria sentido, eventualmente, se iniciásse o cálculo com um número negativo)
            if(this.current === '') return;

            // se alguma operação já tiver sido escrita para o previous.innerText, em vez de passar para lá o que vou escrever no current, quero que passe o resultado dessa operação
            if(this.previous !== ''){
                this.compute();
            };
            
            this.operator = operator_; //{previous: '#', current: '#', operator: '#'}
            this.previous = this.current;
            this.current = '';
        };

        compute(){
            let result;
            let prev = parseFloat(this.previous); //converte uma string para um float
            let curr = parseFloat(this.current); //por exemplo, parseFloat('6*') => 6

            if(isNaN(prev) || isNaN(curr)) return; //se não existir nada no prev ou no curr e, mesmo assim, clicarmos no igual, para a execução. Sem esta condição, se eu escrevesse, por ex., '6+' e clicasse no igual, o displayed result = NaN

            switch(this.operator){
                case '/':
                    result = prev / curr;
                    break;
                case '*':
                    result = prev * curr;
                    break;
                case '-':
                    result = prev - curr;
                    break;
                case '+':
                    result = prev + curr;
                    break;
                default:
                    return;
            };

            this.current = result;
            this.operator = null;
            this.previous = '';

        };

        updateDisplay(){
            currentDisplay.innerText = this.current;

            if(this.operator != null){
                previousDisplay.innerText = this.previous + this.operator;
            }else{
                previousDisplay.innerText = this.previous;
            };
        };

    };

    const numbers = document.querySelectorAll('[data-number]');
    const operators = document.querySelectorAll('[data-operator]');
    const clearAll = document.querySelector('[data-clear-all]');
    const clearEntry = document.querySelector('[data-clear-entry]');
    const equals = document.querySelector('[data-equals]');
    const currentDisplay = document.querySelector('[data-current-display]');
    const previousDisplay = document.querySelector('[data-previous-display]');

    let calcObject = new Calculator(previousDisplay.innerText, currentDisplay.innerText);
    //console.log(calcObject);

    clearAll.addEventListener('click', () => {
        calcObject.clearAll();
        calcObject.updateDisplay();
    });

    clearEntry.addEventListener('click', () => {
        calcObject.clearEntry();
        calcObject.updateDisplay();
    });

    numbers.forEach(numBtn => numBtn.addEventListener('click', () => {
        calcObject.addNumber(numBtn.innerText);
        calcObject.updateDisplay();
    }));

    operators.forEach(opBtn => opBtn.addEventListener('click', () => {
        calcObject.operation(opBtn.innerText);
        calcObject.updateDisplay();
    }));

    equals.addEventListener('click', () => {
        calcObject.compute();
        calcObject.updateDisplay();
    });
});