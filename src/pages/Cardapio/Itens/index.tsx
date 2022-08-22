import React, { useState, useEffect } from "react";
import cardapio from "./itens.json";
import Item from "./Item";
import styles from "./Itens.module.scss";

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

const Itens = (props: Props) => {
  const [lista, setLista] = useState(cardapio);
  const { busca, filtro, ordenador } = props;

  const testaBusca = (title: string) => {
    const regex = new RegExp(busca, "i");
    return regex.test(title);
  };

  const testaFiltro = (id: number) => {
    if (filtro !== null) {
      return filtro === id;
    }
    return true;
  };

  const ordenar = (novaLista: typeof cardapio) => {
    switch (ordenador) {
      case "porcao":
        return novaLista.sort((a, b) => (a.size > b.size ? 1 : -1));
      case "qtd_pessoas":
        return novaLista.sort((a, b) => (a.serving > b.serving ? 1 : -1));
      case "preco":
        return novaLista.sort((a, b) => (a.price > b.price ? 1 : -1));
      default:
        return novaLista;
    }
  };

  useEffect(() => {
    const novaLista = cardapio.filter(
      (item) => testaBusca(item.title) && testaFiltro(item.category.id)
    );
    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Itens;
