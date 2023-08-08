const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = windowWidth;
canvas.height = windowHeight;

