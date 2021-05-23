const permutado = {             
    container_element: null,
    dificuldade: null,
    jogadores: {
        jogando: 1, 
        num1: [],
        list_pal1: [],
        num2: [],
        list_pal2: [],
        change: function(){
            this.jogando = this.jogando == 1 ? this.jogando = 2 : this.jogando = 1
            permutado.draw()
        },
        podeJogar: function(arr1, arr2){
            return (arr1.length == permutado.dificuldade && arr2.length == permutado.dificuldade
            && (new Set(arr1.split(''))).size == arr1.length && 
            (new Set(arr2.split(''))).size == arr2.length && 
            arr1.length == arr2.length)
        },
        podePalpitar: function(arr1){
            return (arr1.length == permutado.dificuldade && new Set(arr1).size == arr1.length)
        }
    },
    init: function(container){
        this.container_element = container
        this.container_element.innerHTML = `
        <label for="num1">Jogador 1 digite o número: </label>
        <input type="password" id="num1"><br>
        <label for="num2">Jogador 2 digite o número: </label>
        <input type="password" id="num2"><br>
        <select id="dif" size="3">
            <option value="3" selected>Fácil(3 Números)</option>
            <option value="4">Médio(4 Números)</option>
            <option value="5">Difícil(5 Números)</option>
        </select>

        <button onclick="permutado.start(document.getElementById('num1'),document.getElementById('num2'), document.getElementById('dif'))">Jogar</button>`
    },
    start: function(n1, n2, dif){
        
        this.dificuldade = dif.value
        if(this.jogadores.podeJogar(n1.value, n2.value, dif.value)){
            this.jogadores.num1 = n1.value.split('')
            this.jogadores.num2 = n2.value.split('')
            this.jogadores.jogando = 1
            this.jogadores.list_pal1 = []
            this.jogadores.list_pal2 = []
            this.container_element.innerHTML = ''
            this.draw()  
        }else{
            alert(`Digite números com ${dif.value} posições e sem valores repetidos, ou escolha outra dificuldade`)
        } 
        
    },
    draw: function(){
        let jogador = this.jogadores.jogando
        let lista = jogador == 1 ? this.jogadores.list_pal1 : this.jogadores.list_pal2  
        this.container_element.innerHTML = `
        <p>Jogador ${jogador} </p>
        <input type = "number" id="palp">
        <button onclick="permutado.makePlay(document.getElementById('palp'))">Palpitar</button>
        `  
        let sel = document.createElement('select')
        sel.setAttribute('size', lista.length)
        for(i in lista){      
            let palpite = document.createElement('option')
            palpite.innerHTML = `${lista[i]}`
            sel.appendChild(palpite)           
        }       
        this.container_element.appendChild(sel)
    },
    makePlay: function(n){
        let perm = 0
        let certo = 0
        let errado = 0
        let jogador = this.jogadores.jogando == 1 ? this.jogadores.num2 : this.jogadores.num1
        let lista = this.jogadores.jogando == 1 ? this.jogadores.list_pal1 : this.jogadores.list_pal2
        let palpite = n.value.split('')

        if(this.jogadores.podePalpitar(palpite)){
            for(i in palpite){
                if( jogador.indexOf(palpite[i]) == i){
                    certo += 1
                }else if(jogador.indexOf(palpite[i]) != -1){
                    perm += 1
                }else{
                    errado += 1
                }            
            }
            if(!this.game_is_over(certo, jogador)){
                lista.push(`${palpite.join('')}: ${certo} certos, ${perm} permutados, ${errado} errados`)
                this.draw()
                document.getElementById('palp').disabled = true
                this.container_element.innerHTML += `
                <button onclick="permutado.jogadores.change()">Proximo =></button>
                `                 
            }else{
                permutado.init(this.container_element)
            }
        }else{
            alert(`Digite números com ${this.dificuldade} posições e sem valores repetidos`)
        }
    },
    game_is_over: function(c,j){
        if(c == this.dificuldade){
            alert(`jogador ${this.jogadores.jogando} venceu\nNúmero: ${j.join('')}`)
            this.init(this.container_element)
            return true
        }
        return false
    }
}
