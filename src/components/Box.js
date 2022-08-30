import React, { useEffect, useState } from 'react'
import '../App.css';

function Box() {
  // INITIAL STATE
  const initialState = [
    { id: 0, value: "", clickable: true },
    { id: 1, value: "", clickable: true },
    { id: 2, value: "", clickable: true },
    { id: 3, value: "", clickable: true },
    { id: 4, value: "", clickable: true },
    { id: 5, value: "", clickable: true },
    { id: 6, value: "", clickable: true },
    { id: 7, value: "", clickable: true },
    { id: 8, value: "", clickable: true },
  ]
  // Data useState
  const [data, setData] = useState(initialState);
  // Tıklandığında X veya O push eder, varsayılan X
  const [pushValue, setPushValue] = useState("X")
  // Berabere kontrolü - 9 olduğunda berabere olur
  const [counter, setCounter] = useState(0)
  // Kazanan X veya O olarak kaydedilir
  const [win, setWin] = useState("")

  // Her kutucuğa tıklandığında çalışır
  const updateState = (e) => {
    // Bir kazanan varsa tüm tıklamalar durur
    if (checkWinner(data) || data[e.target.id].value) {
      return
    }
    // Tıklandığında X kaydedilir. Eğer X varsa O kaydedilir.
    if (pushValue === "X") {
      setPushValue("O")
    } else {
      setPushValue("X")
    }
    // State güncellemesi
    setData(prevState => {
      const newState = prevState.map(obj => {
        // initial state id ile tıklanan kutucuğun id eşleşir
        if (obj.id === parseInt(e.target.id)) {
          // Beraberlik olasılığı için counter 1 artırılır
          setCounter(counter + 1)
          // id ile eşleşen initial değere ilgili X veya O yazılır.
          // Tıklanabilirlik false yapılır. Eski data kaydı ile yeni data güncellenerek döner
          return { ...obj, clickable: false, value: pushValue };
        }
        return obj;
      });

      return newState;
    });
  };

  // Kazanan kontrolü
  const winner = checkWinner(data)
  useEffect(() => {
    if (winner === "X") {
      setWin("X")
    } else if (winner === "O") {
      setWin("O")
    }
  }, [data])

  // Kazanma koşulları burada tanımlanmıştır.
  function checkWinner(boxes) {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    // Kazanma koşuluna göre oyun oynanırkan aynı sıradaki değer burada kontrol edilir eğer eşleşirse
    // değerlerden biri döner ve ilgili değer kazanmış olur.
    for (let i = 0; i < winCondition.length; i++) {
      const [a, b, c] = winCondition[i];
      if (boxes[a].value && boxes[a].value === boxes[b].value && boxes[a].value === boxes[c].value) {

        return boxes[a].value;
      }
    }
    return null;
  }
  // Oyun bitişinde açığa çıkan butona tıklandığında data ve counter ilk haline gelir.
  const resetGame = () => {
    setData(initialState)
    setCounter(0)
  }
  return (
    <div className='App'>
      <div className="box-grid">
        {/* data map edilir */}
        {data.map((box, i) => (
          // Her kutucuk bir buton olarak yapılmıştır. Clickable olması ile css değişir. İçerisine ilgili değer yazılır
          <button key={i} id={box.id} onClick={updateState} className={box.clickable === true ? "clickable box" : "unclickable box"} >{box.value}</button>
        ))}
        {/* Eğer kazanan yok ve counter 9 değilse boş string döner. Kazanan var ise kazanan yazılır ve buton açığa çıkar. Kazanan yok ve counter 9 ise Berabere yazılır */}
        {(winner === null) && (counter !== 9) ? "" : <><button onClick={resetGame} className='boxButton'>{(winner === null) && (counter === 9) ? <div>Berabere - Tekrar Oyna</div> : <div>Kazanan {win} - Tekrar Oyna</div>}</button></>}
      </div>

    </div>
  );
}

export default Box