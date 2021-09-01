import { useState } from 'react';
import Produto from '../Produto'
function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [produto, setProduto] = useState({ nome: "", preco: "" });
  const totalCarrinho = ()=>{
    let data = 0;
    carrinho.forEach((produto)=>{
      data += produto.preco*produto.quantidade
    })
    return data;
  }

  const [valorDisponivel, setValor] = useState(100);

  const handleChangeName = (event) => {
    setProduto((prevState) => {
      return {
        ...produto,
        nome: event.target.value
      };
    });
  };

  const handleChangeValue = (event) => {
    setProduto((prevState) => {
      return {
        ...prevState,
        preco: event.target.value
      };
    });
  };

  const dinheiroUsuario = (event) => {
    setValor(event.target.value)
  }

  const addProduto = () => {
    setCarrinho((prevState) => {
      return prevState.concat({
        ...produto,
        id: Date.now(),
        quantidade: 1
      })
    })
  }

  const excluirProduto = (id)=>{
    setCarrinho((prevState)=>{
      return prevState.filter((produto)=>{
          return produto.id !== id
      })
    })
  }

  const retirarProduto = (id) =>{
    setCarrinho((prevState)=>{
      return prevState.map((produto)=>{
          if(produto.id === id){
            const quantidade = produto.quantidade - 1;
            return{
              ...produto,
              quantidade: quantidade
            }
            
          }
          return produto
      })
    })
  }

  const adicionarProduto = (id) =>{
    setCarrinho((prevState)=>{
      return prevState.map((produto)=>{
          if(produto.id === id){
            const quantidade = produto.quantidade + 1;
            return{
              ...produto,
              quantidade: quantidade
            }
            
          }
          return produto
      })
    })
  }
  console.log(carrinho)
  return (
    <div className="App">
      <p className="valorDisponivel">{valorDisponivel}</p>
      {
        valorDisponivel < totalCarrinho()  ? <p className="Alert" style={{backgroundColor:'tomato'}}> O valor ultrapassou o limite disponível</p> : null 
      }
      
      <div className="total-compra">{totalCarrinho()}</div>
      <div>
        <input onChange={dinheiroUsuario} type="number" />
        {/* NOME DO PRODUTO */}
        <input onChange={handleChangeName} type="text" />
        {/* VALOR DO PRODUTO */}
        <input onChange={handleChangeValue} type="number" />
        {/* ADICIONAR O PRODUTO */}
        <button onClick={addProduto}>ADICIONAR</button>
      </div>

     <div id="lista-de-compras">
      {carrinho.map((produto)=>{
        console.log(totalCarrinho() - produto.preco)
        return <Produto produto={produto}
         diminuirQuantidade={retirarProduto}
         adicionarQuantidade={adicionarProduto}
         excluirProduto={excluirProduto}
         normalizaSeRemover={(totalCarrinho() - produto.preco) <= valorDisponivel && (totalCarrinho() > valorDisponivel)}/>   
        
      })}
     </div>
    </div>

  );
}

export default App;