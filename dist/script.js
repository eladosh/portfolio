// Initialize Matter.js
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

// Create an engine, renderer
const engine = Engine.create();
const render = Render.create({
    canvas: document.getElementById('particleCanvas'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#111',
        wireframes: false, 
        showVelocity: false,
        showCollisions: false,
        showAngleIndicator: false,
        showAxes: false,
    }
});

// Create particles continuously with a delay
function createParticle() {
    const particle = Bodies.circle(
        Math.random() * render.options.width,
        -10,
        Math.random() * 5 + 2, 
        { 
            restitution: 0.8,
            friction: 0,
            render: { fillStyle: 'rgba(255, 255, 255, 0.8)' }
        }
    );
    World.add(engine.world, particle);
}

setInterval(createParticle, 50);

// Create walls
const wallOptions = { isStatic: true, restitution: 0.8 }; // Walls are static and bouncy
const leftWall = Bodies.rectangle(
    -5, // Just off the left edge
    render.options.height / 2, // Center vertically
    10, // Thickness
    render.options.height, // Full height
    wallOptions
);
const rightWall = Bodies.rectangle(
    render.options.width + 5, // Just off the right edge
    render.options.height / 2,
    10,
    render.options.height,
    wallOptions
);
const floor = Bodies.rectangle(
    render.options.width / 2,
    render.options.height + 5,
    render.options.width, 
    10,
    wallOptions
);

// Add walls and floor to the world
World.add(engine.world, [leftWall, rightWall, floor]);

// Run the engine and renderer
Engine.run(engine);
Render.run(render);
