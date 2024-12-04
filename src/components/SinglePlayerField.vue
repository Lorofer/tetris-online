<script setup>
import {onMounted, ref} from "vue";

let lines = ref();

onMounted(() => {
  interval = setInterval(updateTime, 1000);

  const canvas = document.getElementById("single-player-canvas");

  let tetrominoSequence = [];
  let playfield = [];

  lines.value = 0;

  if (canvas.getContext) {
    const context = canvas.getContext("2d");

    const grid = 24;

    for (let row = -2; row < 20; row++) {
      playfield[row] = [];

      for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
      }
    }

    const tetrominos = {
      'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
      ],
      'L': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
      ],
      'O': [
        [1,1],
        [1,1],
      ],
      'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
      ],
      'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
      ],
      'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
      ]
    };

    const colors = {
      'I': 'cyan',
      'O': '#ffe400',
      'T': 'purple',
      'S': 'green',
      'Z': 'red',
      'J': 'blue',
      'L': 'orange'
    };

    let count = 0;

    let tetromino = getNextTetromino();
    // следим за кадрами анимации, чтобы если что — остановить игру
    let rAF = null;
    // флаг конца игры, на старте — неактивный
    let gameOver = false;

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // создаём последовательность фигур, которая появится в игре
    //https://tetris.fandom.com/wiki/Random_Generator
    function generateSequence() {
      const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

      while (sequence.length) {
        // случайным образом находим любую из них
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        // помещаем выбранную фигуру в игровой массив с последовательностями
        tetrominoSequence.push(name);
      }
    }

    // получаем следующую фигуру
    function getNextTetromino() {
      // если следующей нет — генерируем
      if (tetrominoSequence.length === 0) {
        generateSequence();
      }
      // берём первую фигуру из массива
      const name = tetrominoSequence.pop();
      // сразу создаём матрицу, с которой мы отрисуем фигуру
      const matrix = tetrominos[name];

      // I и O стартуют с середины, остальные — чуть левее
      const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

      // I начинает с 21 строки (смещение -1), а все остальные — со строки 22 (смещение -2)
      const row = name === 'I' ? -1 : -2;

      // вот что возвращает функция
      return {
        name: name,      // название фигуры (L, O, и т.д.)
        matrix: matrix,  // матрица с фигурой
        row: row,        // текущая строка (фигуры стартую за видимой областью холста)
        col: col         // текущий столбец
      };
    }

    // поворачиваем матрицу на 90 градусов
    // https://codereview.stackexchange.com/a/186834
    function rotate(matrix) {
      const N = matrix.length - 1;
      const result = matrix.map((row, i) =>
          row.map((val, j) => matrix[N - j][i])
      );
      // на входе матрица, и на выходе тоже отдаём матрицу
      return result;
    }

    // проверяем после появления или вращения, может ли матрица (фигура) быть в этом месте поля или она вылезет за его границы
    function isValidMove(matrix, cellRow, cellCol) {
      // проверяем все строки и столбцы
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          if (matrix[row][col] && (
              // если выходит за границы поля…
              cellCol + col < 0 ||
              cellCol + col >= playfield[0].length ||
              cellRow + row >= playfield.length ||
              // …или пересекается с другими фигурами
              playfield[cellRow + row][cellCol + col])
          ) {
            // то возвращаем, что нет, так не пойдёт
            return false;
          }
        }
      }
      // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
      return true;
    }

    // когда фигура окончательна встала на своё место
    function placeTetromino() {
      // обрабатываем все строки и столбцы в игровом поле
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {

            // если край фигуры после установки вылезает за границы поля, то игра закончилась
            if (tetromino.row + row < 0) {
              return showGameOver();
            }
            // если всё в порядке, то записываем в массив игрового поля нашу фигуру
            playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
          }
        }
      }

      // проверяем, чтобы заполненные ряды очистились снизу вверх
      for (let row = playfield.length - 1; row >= 0; ) {
        // если ряд заполнен
        if (playfield[row].every(cell => !!cell)) {

          // очищаем его и опускаем всё вниз на одну клетку
          for (let r = row; r >= 0; r--) {
            for (let c = 0; c < playfield[r].length; c++) {
              playfield[r][c] = playfield[r-1][c];
            }
          }

          lines.value++;
        }
        else {
          // переходим к следующему ряду
          row--;
        }
      }
      // получаем следующую фигуру
      tetromino = getNextTetromino();
    }

    // показываем надпись Game Over
    function showGameOver() {
      clearInterval(interval);
      // прекращаем всю анимацию игры
      cancelAnimationFrame(rAF);
      // ставим флаг окончания
      gameOver = true;
      // рисуем чёрный прямоугольник посередине поля
      context.fillStyle = 'black';
      context.globalAlpha = 0.75;
      context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
      // пишем надпись белым моноширинным шрифтом по центру
      context.globalAlpha = 1;
      context.fillStyle = 'white';
      context.font = '36px monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
    }



    // главный цикл игры
    function loop() {
      // начинаем анимацию
      rAF = requestAnimationFrame(loop);
      // очищаем холст
      context.clearRect(0,0,canvas.width,canvas.height);

      // рисуем игровое поле с учётом заполненных фигур
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (playfield[row][col]) {
            const name = playfield[row][col];
            context.fillStyle = colors[name];

            // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
            context.fillRect(col * grid, row * grid, grid-1, grid-1);
          }
        }
      }

      // рисуем текущую фигуру
      if (tetromino) {

        // фигура сдвигается вниз каждые 35 кадров
        if (++count > 35) {
          tetromino.row++;
          count = 0;

          // если движение закончилось — рисуем фигуру в поле и проверяем, можно ли удалить строки
          if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.row--;
            placeTetromino();
          }
        }

        // не забываем про цвет текущей фигуры
        context.fillStyle = colors[tetromino.name];

        // отрисовываем её
        for (let row = 0; row < tetromino.matrix.length; row++) {
          for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

              // и снова рисуем на один пиксель меньше
              context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
            }
          }
        }
      }
    }

    // следим за нажатиями на клавиши
    document.addEventListener('keydown', function(e) {
      // если игра закончилась — сразу выходим
      if (gameOver) return;

      // стрелки влево и вправо
      if (e.which === 37 || e.which === 39) {
        const col = e.which === 37
            // если влево, то уменьшаем индекс в столбце, если вправо — увеличиваем
            ? tetromino.col - 1
            : tetromino.col + 1;

        // если так ходить можно, то запоминаем текущее положение
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
          tetromino.col = col;
        }
      }

      // стрелка вверх — поворот
      if (e.which === 38) {
        // поворачиваем фигуру на 90 градусов
        const matrix = rotate(tetromino.matrix);
        // если так ходить можно — запоминаем
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
          tetromino.matrix = matrix;
        }
      }

      // стрелка вниз — ускорить падение
      if(e.which === 40) {
        // смещаем фигуру на строку вниз
        const row = tetromino.row + 1;
        // если опускаться больше некуда — запоминаем новое положение
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
          tetromino.row = row - 1;
          // ставим на место и смотрим на заполненные ряды
          placeTetromino();
          return;
        }
        // запоминаем строку, куда стала фигура
        tetromino.row = row;
      }
    });

    // старт игры
    rAF = requestAnimationFrame(loop);
  }
})

const seconds = ref(0);
const minutes = ref(0);
let interval;

function updateTime() {
  seconds.value++;
  if (seconds.value === 60) {
    minutes.value++;
    seconds.value = 0;
  }
}

</script>

<template>
<div class="single-player-field-container">
  <canvas class="single-player-canvas" id="single-player-canvas" width="240" height="480"/>
  <div class="data-container">
    <div class="timer-container">
      <img class="timer-img" src="@/../public/clock.png" alt="">
      <p class="timer-text" id="timer">{{minutes.toString().padStart(2, '0')}}:{{seconds.toString().padStart(2, '0')}}</p>
    </div>
    <table class="data-table">
      <tbody class="data-tbody">
        <tr>
          <td>Очки:</td>
          <td></td>
        </tr>
        <tr>
          <td>Линии:</td>
          <td>{{lines}}</td>
        </tr>
        <tr>
          <td>Уровень:</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/base";

.single-player-field-container{
  width: 522px;
  background-color: $bg-beige;
  border-radius: 24px;
  padding: 48px;

  display: flex;
  gap: 24px;
}

.single-player-canvas{
  background-color: #fff;
  border: 1px solid $separator-grey;
}

.data-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .timer-container{
    display: flex;
    justify-content: center;
    gap: 12px;

    .timer-img{
      width: 24px;
      height: 24px;
    }

    .timer-text{
      font-size: 20px;
    }
  }

  .data-table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 12px;

    td:last-child{
      text-align: right;
    }
  }
}
</style>