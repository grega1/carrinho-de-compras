import { useState } from 'react';

function Produto(props) {
  console.log(props)
  const { produto, normalizaSeRemover } = props;
  const retirarProduto = () =>{
    props.diminuirQuantidade(produto.id)
  }
  const adicionarProduto = () =>{
    props.adicionarQuantidade(produto.id)
  }
  const excluirProduto = () =>{
    props.excluirProduto(produto.id)
  }
  
  const totalProduto = produto.quantidade * produto.preco;
  return (
    <div key={produto.id} style={{display:'flex', marginBottom:'10px'}}>
      <button onClick={retirarProduto} style={{backgroundColor:normalizaSeRemover ? 'orange' : 'inherit'}}> - </button>
      <p>{produto.nome}</p>
      <button  onClick={adicionarProduto}> + </button>
      <p> R$ {produto.preco}</p> <p> quantidade {produto.quantidade}</p>
      <button onClick={excluirProduto} >Del</button>
      <p>{totalProduto}</p>
    </div>
  )
}
export default Produto