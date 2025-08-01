const createStylesheet = (): HTMLElement => {
	const element = document.createElement('div');

	element.innerHTML = `
<style>
  @keyframes tile_spawned {
    0% {
      transform: scale(0);
    }
    33% {
      transform: scale(0.1);
    }
    66% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes merged_into {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1);
    }
    66% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .game_container {
    background-color: #bbac9f;
    border-radius: 3%;
    box-shadow: 0 0 10px #ccc;
    padding: 1.8%;
  }
  
  .resize_helper {
    position: relative;
    width: 100%;
  }
  
  .tiles_container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .tile_container {
    position: absolute;
    box-sizing: border-box;
    padding: 1.8%;
    transition: top 200ms, left 200ms;
    border: 1px solid #bbac9f;
  }
  
  .tile {
    background: #000;
    color: #fff4cc;
    height: 100%;
    width: 100%;
    border-radius: 10%;
  
    display: flex;
    align-items: center;
    justify-content: center;
  
    font-weight: bold;
    font-family: 'Brush Script MT', cursive;
  }
  
  .tile.new {
    animation: tile_spawned 300ms ease-in-out;
  }
  .tile.merged_into {
    animation: merged_into 300ms ease-in-out;
  }
  
  .tile.value_2 {
    background: #eee4da;
    color: #504a43;
  }
  
  .tile.value_4 {
    background: #eee1c9;
    color: #504a43;
  }
  
  .tile.value_8 {
    background: #f3b27a;
  }
  
  .tile.value_16 {
    background: #f69664;
  }
  
  .tile.value_32 {
    background: #f77c5f;
  }
  
  .tile.value_64 {
    background: #f75f3b;
  }
  
  .tile.value_128 {
    background: #edd073;
    font-size: 90%;
  }
  
  .tile.value_256 {
    background: #edcc62;
    font-size: 90%;
  }
  
  .tile.value_512 {
    background: #edc950;
    font-size: 90%;
  }
  
  .tile.value_1024 {
    background: #edc53f;
    font-size: 80%;
  }
  
  .tile.value_2048 {
    background: #edc22e;
    font-size: 80%;
  }
</style>
  `;

	return element.lastElementChild as HTMLElement;
};

export default createStylesheet;
